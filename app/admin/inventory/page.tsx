"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertTriangle,
  Boxes,
  CircleDollarSign,
  Clock3,
  Edit3,
  History,
  Minus,
  Package,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import AdminLayout from "@/components/admin/AdminLayout";

import type {
  InventoryCategory,
  InventoryItem,
  StockTransaction,
  StockTransactionType,
} from "@/types/inventory";

import {
  addInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  getInventoryStatus,
  getStockHistory,
  stockIn,
  stockOut,
  updateInventoryItem,
} from "@/services/inventoryService";

// ==========================================
// Categories
// ==========================================

const categories:
  InventoryCategory[] = [
  "Laptop",
  "SSD",
  "RAM",
  "HDD",
  "Battery",
  "Charger",
  "Display",
  "Keyboard",
  "Adapter",
  "Other",
];

// ==========================================
// Form
// ==========================================

const emptyForm = {
  sku: "",
  name: "",
  category:
    "Other" as InventoryCategory,
  brand: "",
  model: "",
  purchasePrice: 0,
  sellingPrice: 0,
  stockQty: 0,
  minimumStock: 1,
  supplier: "",
  location: "",
  notes: "",
};

type ModalMode =
  | "create"
  | "edit"
  | "stockIn"
  | "stockOut";

export default function InventoryPage() {
  const [
    items,
    setItems,
  ] = useState<InventoryItem[]>(
    []
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    modalMode,
    setModalMode,
  ] = useState<ModalMode | null>(
    null
  );

  const [
    selectedItem,
    setSelectedItem,
  ] = useState<InventoryItem | null>(
    null
  );

  const [
    form,
    setForm,
  ] = useState(
    emptyForm
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    quantity,
    setQuantity,
  ] = useState(1);

  const [
    stockReason,
    setStockReason,
  ] = useState("");

  const [
    stockReference,
    setStockReference,
  ] = useState("");

  const [
    historyOpen,
    setHistoryOpen,
  ] = useState(false);

  const [
    history,
    setHistory,
  ] = useState<
    StockTransaction[]
  >([]);

  const [
    historyLoading,
    setHistoryLoading,
  ] = useState(false);

  // ==========================================
  // LOAD INVENTORY
  // ==========================================

  async function loadInventory() {
    try {
      setLoading(true);

      const data =
        await getInventoryItems();

      setItems(data);
    } catch (error) {
      console.error(
        "Failed to load inventory:",
        error
      );

      alert(
        "Failed to load inventory."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadInventory();
  }, []);

  // ==========================================
  // SUMMARY
  // ==========================================

  const totalItems =
    items.length;

  const totalUnits =
    items.reduce(
      (sum, item) =>
        sum +
        Number(
          item.stockQty || 0
        ),
      0
    );

  const lowStockItems =
    items.filter(
      (item) =>
        item.status ===
        "Low Stock"
    ).length;

  const outOfStockItems =
    items.filter(
      (item) =>
        item.status ===
        "Out of Stock"
    ).length;

  const inventoryValue =
    items.reduce(
      (sum, item) =>
        sum +
        Number(
          item.purchasePrice || 0
        ) *
          Number(
            item.stockQty || 0
          ),
      0
    );

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredItems =
    useMemo(() => {
      const keyword =
        search
          .toLowerCase()
          .trim();

      if (!keyword) {
        return items;
      }

      return items.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(
              keyword
            ) ||
          item.sku
            .toLowerCase()
            .includes(
              keyword
            ) ||
          item.category
            .toLowerCase()
            .includes(
              keyword
            ) ||
          item.brand
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          item.model
            ?.toLowerCase()
            .includes(
              keyword
            )
      );
    }, [
      items,
      search,
    ]);

  // ==========================================
  // OPEN CREATE
  // ==========================================

  function openCreate() {
    setSelectedItem(
      null
    );

    setForm({
      ...emptyForm,
    });

    setModalMode(
      "create"
    );
  }

  // ==========================================
  // OPEN EDIT
  // ==========================================

  function openEdit(
    item: InventoryItem
  ) {
    setSelectedItem(
      item
    );

    setForm({
      sku:
        item.sku,

      name:
        item.name,

      category:
        item.category,

      brand:
        item.brand || "",

      model:
        item.model || "",

      purchasePrice:
        Number(
          item.purchasePrice || 0
        ),

      sellingPrice:
        Number(
          item.sellingPrice || 0
        ),

      stockQty:
        Number(
          item.stockQty || 0
        ),

      minimumStock:
        Number(
          item.minimumStock || 0
        ),

      supplier:
        item.supplier || "",

      location:
        item.location || "",

      notes:
        item.notes || "",
    });

    setModalMode(
      "edit"
    );
  }

  // ==========================================
  // STOCK MODAL
  // ==========================================

  function openStockModal(
    item: InventoryItem,
    mode:
      | "stockIn"
      | "stockOut"
  ) {
    setSelectedItem(
      item
    );

    setQuantity(1);

    setStockReason("");

    setStockReference("");

    setModalMode(mode);
  }

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  function closeModal() {
    if (saving) {
      return;
    }

    setModalMode(
      null
    );

    setSelectedItem(
      null
    );

    setForm({
      ...emptyForm,
    });

    setQuantity(1);

    setStockReason("");

    setStockReference("");
  }

  // ==========================================
  // FORM UPDATE
  // ==========================================

  function updateForm(
    field: keyof typeof emptyForm,
    value: string | number
  ) {
    setForm(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );
  }

  // ==========================================
  // CREATE / EDIT SAVE
  // ==========================================

  async function handleSaveItem() {
    if (!form.sku.trim()) {
      alert(
        "SKU is required."
      );

      return;
    }

    if (!form.name.trim()) {
      alert(
        "Item name is required."
      );

      return;
    }

    if (
      Number(
        form.minimumStock
      ) < 0
    ) {
      alert(
        "Minimum stock cannot be negative."
      );

      return;
    }

    try {
      setSaving(true);

      const now =
        new Date().toISOString();

      // ========================================
      // CREATE
      // ========================================

      if (
        modalMode ===
        "create"
      ) {
        const stockQty =
          Number(
            form.stockQty
          ) || 0;

        const minimumStock =
          Number(
            form.minimumStock
          ) || 0;

        await addInventoryItem({
          sku:
            form.sku.trim(),

          name:
            form.name.trim(),

          category:
            form.category,

          brand:
            form.brand.trim(),

          model:
            form.model.trim(),

          purchasePrice:
            Number(
              form.purchasePrice
            ) || 0,

          sellingPrice:
            Number(
              form.sellingPrice
            ) || 0,

          stockQty,

          minimumStock,

          supplier:
            form.supplier.trim(),

          location:
            form.location.trim(),

          status:
            getInventoryStatus(
              stockQty,
              minimumStock
            ),

          notes:
            form.notes.trim(),

          createdAt:
            now,

          updatedAt:
            now,
        });

        alert(
          "✅ Inventory item added successfully."
        );
      }

      // ========================================
      // EDIT
      // ========================================

      if (
        modalMode ===
          "edit" &&
        selectedItem?.id
      ) {
        await updateInventoryItem(
          selectedItem.id,
          {
            sku:
              form.sku.trim(),

            name:
              form.name.trim(),

            category:
              form.category,

            brand:
              form.brand.trim(),

            model:
              form.model.trim(),

            purchasePrice:
              Number(
                form.purchasePrice
              ) || 0,

            sellingPrice:
              Number(
                form.sellingPrice
              ) || 0,

            // Keep current stock unchanged
            stockQty:
              selectedItem.stockQty,

            minimumStock:
              Number(
                form.minimumStock
              ) || 0,

            supplier:
              form.supplier.trim(),

            location:
              form.location.trim(),

            notes:
              form.notes.trim(),

            updatedAt:
              now,
          }
        );

        alert(
          "✅ Inventory item updated successfully."
        );
      }

      closeModal();

      await loadInventory();
    } catch (error) {
      console.error(
        "Inventory save error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save inventory item."
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // STOCK SAVE
  // ==========================================

  async function handleStockSave() {
    if (!selectedItem?.id) {
      return;
    }

    const qty =
      Math.floor(
        Number(quantity)
      );

    if (
      !Number.isFinite(qty) ||
      qty <= 0
    ) {
      alert(
        "Enter a valid quantity."
      );

      return;
    }

    if (
      modalMode ===
        "stockOut" &&
      qty >
        Number(
          selectedItem.stockQty ||
            0
        )
    ) {
      alert(
        `Available stock is ${selectedItem.stockQty}.`
      );

      return;
    }

    try {
      setSaving(true);

      if (
        modalMode ===
        "stockIn"
      ) {
        await stockIn(
          selectedItem.id,
          qty,
          stockReason,
          stockReference
        );

        alert(
          "✅ Stock added successfully."
        );
      }

      if (
        modalMode ===
        "stockOut"
      ) {
        await stockOut(
          selectedItem.id,
          qty,
          stockReason,
          stockReference
        );

        alert(
          "✅ Stock removed successfully."
        );
      }

      closeModal();

      await loadInventory();
    } catch (error) {
      console.error(
        "Stock operation error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Stock operation failed."
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // DELETE
  // ==========================================

  async function handleDelete(
    item: InventoryItem
  ) {
    if (!item.id) {
      return;
    }

    const ok =
      window.confirm(
        `Delete "${item.name}" from inventory?`
      );

    if (!ok) {
      return;
    }

    try {
      await deleteInventoryItem(
        item.id
      );

      await loadInventory();
    } catch (error) {
      console.error(
        "Delete inventory error:",
        error
      );

      alert(
        "Failed to delete inventory item."
      );
    }
  }

  // ==========================================
  // HISTORY
  // ==========================================

  async function openHistory(
    item?: InventoryItem
  ) {
    try {
      setHistoryLoading(
        true
      );

      setHistoryOpen(
        true
      );

      const data =
        await getStockHistory(
          item?.id
        );

      setHistory(data);
    } catch (error) {
      console.error(
        "History loading error:",
        error
      );

      alert(
        "Failed to load stock history."
      );
    } finally {
      setHistoryLoading(
        false
      );
    }
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-black p-5 text-white sm:p-8">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-3">
                <Boxes
                  size={24}
                  className="text-yellow-400"
                />
              </div>

              <div>

                <h1 className="text-3xl font-black">
                  Inventory
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                  Manage parts, stock quantities and inventory history.
                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() =>
                void openHistory()
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-white hover:bg-zinc-800"
            >
              <History
                size={18}
              />

              Stock History
            </button>

            <button
              type="button"
              onClick={
                openCreate
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-black text-black hover:bg-yellow-300"
            >
              <Plus
                size={18}
              />

              Add Inventory Item
            </button>

          </div>

        </div>

        {/* ==========================================
            SUMMARY
        ========================================== */}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

          <SummaryCard
            title="Total Items"
            value={
              totalItems
            }
            icon={
              <Package
                size={20}
              />
            }
          />

          <SummaryCard
            title="Total Units"
            value={
              totalUnits
            }
            icon={
              <Boxes
                size={20}
              />
            }
          />

          <SummaryCard
            title="Low Stock"
            value={
              lowStockItems
            }
            icon={
              <AlertTriangle
                size={20}
              />
            }
          />

          <SummaryCard
            title="Out of Stock"
            value={
              outOfStockItems
            }
            icon={
              <AlertTriangle
                size={20}
              />
            }
          />

          <SummaryCard
            title="Stock Value"
            value={`₹${inventoryValue.toLocaleString(
              "en-IN",
              {
                maximumFractionDigits: 2,
              }
            )}`}
            icon={
              <CircleDollarSign
                size={20}
              />
            }
          />

        </div>

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div className="relative mb-5">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={
              search
            }
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search SKU, item, brand, model or category..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-4 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
          />

        </div>

        {/* ==========================================
            TABLE
        ========================================== */}

        <div className="overflow-x-auto rounded-2xl border border-yellow-500/20 bg-[#181818]">

          <table className="min-w-full">

            <thead className="bg-[#202020]">

              <tr>

                <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                  SKU
                </th>

                <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                  Item
                </th>

                <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                  Category
                </th>

                <th className="px-4 py-4 text-right text-xs font-bold uppercase text-yellow-400">
                  Purchase
                </th>

                <th className="px-4 py-4 text-right text-xs font-bold uppercase text-yellow-400">
                  Selling
                </th>

                <th className="px-4 py-4 text-center text-xs font-bold uppercase text-yellow-400">
                  Stock
                </th>

                <th className="px-4 py-4 text-center text-xs font-bold uppercase text-yellow-400">
                  Status
                </th>

                <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                  Supplier
                </th>

                <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                  Location
                </th>

                <th className="px-4 py-4 text-center text-xs font-bold uppercase text-yellow-400">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td
                    colSpan={
                      10
                    }
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    Loading Inventory...
                  </td>
                </tr>
              )}

              {!loading &&
                filteredItems.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={
                        10
                      }
                      className="px-6 py-12 text-center text-zinc-500"
                    >
                      No inventory items found.
                    </td>
                  </tr>
                )}

              {!loading &&
                filteredItems.map(
                  (item) => (
                    <tr
                      key={
                        item.id
                      }
                      className="border-t border-zinc-800 hover:bg-[#202020]"
                    >

                      <td className="px-4 py-4 font-bold text-yellow-400">
                        {
                          item.sku
                        }
                      </td>

                      <td className="px-4 py-4">

                        <p className="font-semibold text-white">
                          {
                            item.name
                          }
                        </p>

                        {(item.brand ||
                          item.model) && (
                          <p className="mt-1 text-xs text-zinc-500">
                            {[
                              item.brand,
                              item.model,
                            ]
                              .filter(
                                Boolean
                              )
                              .join(
                                " • "
                              )}
                          </p>
                        )}

                      </td>

                      <td className="px-4 py-4 text-zinc-300">
                        {
                          item.category
                        }
                      </td>

                      <td className="px-4 py-4 text-right text-zinc-300">
                        ₹
                        {Number(
                          item.purchasePrice
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-4 py-4 text-right text-zinc-300">
                        ₹
                        {Number(
                          item.sellingPrice
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      <td className="px-4 py-4 text-center">

                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-400">
                          {
                            item.stockQty
                          }
                        </span>

                      </td>

                      <td className="px-4 py-4 text-center">

                        <StatusBadge
                          status={
                            item.status
                          }
                        />

                      </td>

                      <td className="px-4 py-4 text-zinc-400">
                        {
                          item.supplier ||
                          "-"
                        }
                      </td>

                      <td className="px-4 py-4 text-zinc-400">
                        {
                          item.location ||
                          "-"
                        }
                      </td>

                      <td className="px-4 py-4">

                        <div className="flex items-center justify-center gap-1">

                          <ActionButton
                            title="Edit"
                            onClick={() =>
                              openEdit(
                                item
                              )
                            }
                          >
                            <Edit3
                              size={16}
                            />
                          </ActionButton>

                          <ActionButton
                            title="Stock In"
                            onClick={() =>
                              openStockModal(
                                item,
                                "stockIn"
                              )
                            }
                          >
                            <Plus
                              size={16}
                            />
                          </ActionButton>

                          <ActionButton
                            title="Stock Out"
                            onClick={() =>
                              openStockModal(
                                item,
                                "stockOut"
                              )
                            }
                          >
                            <Minus
                              size={16}
                            />
                          </ActionButton>

                          <ActionButton
                            title="History"
                            onClick={() =>
                              void openHistory(
                                item
                              )
                            }
                          >
                            <Clock3
                              size={16}
                            />
                          </ActionButton>

                          <ActionButton
                            title="Delete"
                            danger
                            onClick={() =>
                              void handleDelete(
                                item
                              )
                            }
                          >
                            <Trash2
                              size={16}
                            />
                          </ActionButton>

                        </div>

                      </td>

                    </tr>
                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ==========================================
          CREATE / EDIT MODAL
      ========================================== */}

      {(modalMode ===
        "create" ||
        modalMode ===
          "edit") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">

          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818] shadow-2xl">

            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Inventory
                </p>

                <h2 className="mt-1 text-2xl font-black text-white">
                  {modalMode ===
                  "create"
                    ? "Add Inventory Item"
                    : "Edit Inventory Item"}
                </h2>

              </div>

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={
                  saving
                }
                className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X
                  size={24}
                />
              </button>

            </div>

            <div className="overflow-y-auto p-6">

              <div className="grid gap-5 md:grid-cols-2">

                <Field
                  label="SKU *"
                  value={
                    form.sku
                  }
                  onChange={(value) =>
                    updateForm(
                      "sku",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  placeholder="SSD-500-001"
                />

                <Field
                  label="Item Name *"
                  value={
                    form.name
                  }
                  onChange={(value) =>
                    updateForm(
                      "name",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  placeholder="500GB SSD"
                />

                <div>

                  <label className="mb-2 block text-sm font-semibold text-zinc-400">
                    Category
                  </label>

                  <select
                    value={
                      form.category
                    }
                    onChange={(e) =>
                      updateForm(
                        "category",
                        e.target.value as InventoryCategory
                      )
                    }
                    disabled={
                      saving
                    }
                    className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                  >

                    {categories.map(
                      (
                        category
                      ) => (
                        <option
                          key={
                            category
                          }
                          value={
                            category
                          }
                        >
                          {
                            category
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>

                <Field
                  label="Brand"
                  value={
                    form.brand
                  }
                  onChange={(value) =>
                    updateForm(
                      "brand",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  placeholder="Samsung"
                />

                <Field
                  label="Model"
                  value={
                    form.model
                  }
                  onChange={(value) =>
                    updateForm(
                      "model",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  placeholder="870 EVO"
                />

                <Field
                  label="Supplier"
                  value={
                    form.supplier
                  }
                  onChange={(value) =>
                    updateForm(
                      "supplier",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  placeholder="Supplier name"
                />

                <Field
                  label="Location / Rack"
                  value={
                    form.location
                  }
                  onChange={(value) =>
                    updateForm(
                      "location",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  placeholder="Rack A1"
                />

                <NumberField
                  label="Purchase Price"
                  value={
                    form.purchasePrice
                  }
                  onChange={(value) =>
                    updateForm(
                      "purchasePrice",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                <NumberField
                  label="Selling Price"
                  value={
                    form.sellingPrice
                  }
                  onChange={(value) =>
                    updateForm(
                      "sellingPrice",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                />

                {modalMode ===
                  "create" && (
                  <NumberField
                    label="Opening Stock"
                    value={
                      form.stockQty
                    }
                    onChange={(
                      value
                    ) =>
                      updateForm(
                        "stockQty",
                        value
                      )
                    }
                    disabled={
                      saving
                    }
                    min={
                      0
                    }
                  />
                )}

                {modalMode ===
                  "edit" && (
                  <div>

                    <label className="mb-2 block text-sm font-semibold text-zinc-400">
                      Current Stock
                    </label>

                    <div className="rounded-xl border border-zinc-700 bg-zinc-950 p-4 font-black text-blue-400">
                      {
                        selectedItem?.stockQty ??
                        0
                      }

                      <p className="mt-1 text-xs font-normal text-zinc-600">
                        Use Stock In / Stock Out to change stock quantity.
                      </p>

                    </div>

                  </div>
                )}

                <NumberField
                  label="Minimum Stock"
                  value={
                    form.minimumStock
                  }
                  onChange={(value) =>
                    updateForm(
                      "minimumStock",
                      value
                    )
                  }
                  disabled={
                    saving
                  }
                  min={
                    0
                  }
                />

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-semibold text-zinc-400">
                    Notes
                  </label>

                  <textarea
                    value={
                      form.notes
                    }
                    onChange={(e) =>
                      updateForm(
                        "notes",
                        e.target.value
                      )
                    }
                    disabled={
                      saving
                    }
                    rows={4}
                    placeholder="Optional notes"
                    className="w-full resize-none rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400"
                  />

                </div>

              </div>

            </div>

            <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-5">

              <button
                type="button"
                onClick={
                  closeModal
                }
                disabled={
                  saving
                }
                className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  void handleSaveItem()
                }
                disabled={
                  saving
                }
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 text-sm font-black text-black hover:bg-yellow-300 disabled:opacity-50"
              >
                <Edit3
                  size={16}
                />

                {saving
                  ? "Saving..."
                  : modalMode ===
                      "create"
                    ? "Save Item"
                    : "Save Changes"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          STOCK IN / OUT MODAL
      ========================================== */}

      {(modalMode ===
        "stockIn" ||
        modalMode ===
          "stockOut") &&
        selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">

            <div className="w-full max-w-lg rounded-3xl border border-yellow-500/20 bg-[#181818] shadow-2xl">

              <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                    Stock Operation
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-white">
                    {modalMode ===
                    "stockIn"
                      ? "Stock In"
                      : "Stock Out"}
                  </h2>

                </div>

                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                >
                  <X
                    size={24}
                  />
                </button>

              </div>

              <div className="space-y-5 p-6">

                <div className="rounded-2xl border border-zinc-800 bg-black/40 p-4">

                  <p className="text-xs font-bold uppercase text-zinc-500">
                    Item
                  </p>

                  <p className="mt-1 text-lg font-black text-white">
                    {
                      selectedItem.name
                    }
                  </p>

                  <div className="mt-3 flex items-center justify-between">

                    <span className="text-sm text-zinc-500">
                      Current Stock
                    </span>

                    <span className="font-black text-blue-400">
                      {
                        selectedItem.stockQty
                      }
                    </span>

                  </div>

                </div>

                <NumberField
                  label="Quantity *"
                  value={
                    quantity
                  }
                  onChange={
                    setQuantity
                  }
                  disabled={
                    saving
                  }
                  min={
                    1
                  }
                />

                <Field
                  label="Reason"
                  value={
                    stockReason
                  }
                  onChange={
                    setStockReason
                  }
                  disabled={
                    saving
                  }
                  placeholder={
                    modalMode ===
                    "stockIn"
                      ? "Purchase / supplier delivery"
                      : "Repair usage / damaged / sale"
                  }
                />

                <Field
                  label="Reference"
                  value={
                    stockReference
                  }
                  onChange={
                    setStockReference
                  }
                  disabled={
                    saving
                  }
                  placeholder="Invoice / PO / Repair ID"
                />

                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">

                  <p className="text-sm text-zinc-400">
                    New stock after operation
                  </p>

                  <p className="mt-1 text-2xl font-black text-yellow-400">
                    {modalMode ===
                    "stockIn"
                      ? Number(
                          selectedItem.stockQty
                        ) +
                        Number(
                          quantity
                        )
                      : Math.max(
                          Number(
                            selectedItem.stockQty
                          ) -
                            Number(
                              quantity
                            ),
                          0
                        )}
                  </p>

                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-zinc-800 px-6 py-5">

                <button
                  type="button"
                  onClick={
                    closeModal
                  }
                  disabled={
                    saving
                  }
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-bold text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void handleStockSave()
                  }
                  disabled={
                    saving
                  }
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-black ${
                    modalMode ===
                    "stockIn"
                      ? "bg-green-500 text-black hover:bg-green-400"
                      : "bg-red-500 text-white hover:bg-red-400"
                  } disabled:opacity-50`}
                >
                  {modalMode ===
                  "stockIn" ? (
                    <Plus
                      size={17}
                    />
                  ) : (
                    <Minus
                      size={17}
                    />
                  )}

                  {saving
                    ? "Processing..."
                    : modalMode ===
                      "stockIn"
                    ? "Add Stock"
                    : "Remove Stock"}
                </button>

              </div>

            </div>

          </div>
        )}

      {/* ==========================================
          HISTORY MODAL
      ========================================== */}

      {historyOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4">

          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-yellow-500/20 bg-[#181818] shadow-2xl">

            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Inventory
                </p>

                <h2 className="mt-1 text-2xl font-black text-white">
                  Stock History
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setHistoryOpen(
                    false
                  )
                }
                className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <X
                  size={24}
                />
              </button>

            </div>

            <div className="overflow-y-auto p-6">

              {historyLoading && (
                <div className="py-12 text-center text-zinc-500">
                  Loading stock history...
                </div>
              )}

              {!historyLoading &&
                history.length ===
                  0 && (
                  <div className="rounded-2xl border border-zinc-800 bg-black/30 p-12 text-center text-zinc-500">
                    No stock transactions found.
                  </div>
                )}

              {!historyLoading &&
                history.length >
                  0 && (
                  <div className="overflow-x-auto rounded-2xl border border-zinc-800">

                    <table className="min-w-full">

                      <thead className="bg-zinc-900">

                        <tr>

                          <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                            Date
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                            Item
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                            Type
                          </th>

                          <th className="px-4 py-4 text-center text-xs font-bold uppercase text-yellow-400">
                            Qty
                          </th>

                          <th className="px-4 py-4 text-center text-xs font-bold uppercase text-yellow-400">
                            Stock
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                            Reason
                          </th>

                          <th className="px-4 py-4 text-left text-xs font-bold uppercase text-yellow-400">
                            Reference
                          </th>

                        </tr>

                      </thead>

                      <tbody>

                        {history.map(
                          (
                            record
                          ) => (
                            <tr
                              key={
                                record.id
                              }
                              className="border-t border-zinc-800"
                            >

                              <td className="px-4 py-4 text-sm text-zinc-400">
                                {new Date(
                                  record.createdAt
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </td>

                              <td className="px-4 py-4">

                                <p className="font-semibold text-white">
                                  {
                                    record.itemName
                                  }
                                </p>

                                <p className="text-xs text-zinc-600">
                                  {
                                    record.sku
                                  }
                                </p>

                              </td>

                              <td className="px-4 py-4">

                                <TransactionBadge
                                  type={
                                    record.type
                                  }
                                />

                              </td>

                              <td className="px-4 py-4 text-center font-bold text-white">
                                {
                                  record.quantity
                                }
                              </td>

                              <td className="px-4 py-4 text-center text-sm">

                                <span className="text-zinc-500">
                                  {
                                    record.previousStock
                                  }
                                </span>

                                <span className="mx-2 text-zinc-700">
                                  →
                                </span>

                                <span className="font-bold text-yellow-400">
                                  {
                                    record.newStock
                                  }
                                </span>

                              </td>

                              <td className="px-4 py-4 text-sm text-zinc-400">
                                {
                                  record.reason ||
                                  "-"
                                }
                              </td>

                              <td className="px-4 py-4 text-sm text-zinc-400">
                                {
                                  record.reference ||
                                  "-"
                                }
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>

                  </div>
                )}

            </div>

          </div>

        </div>
      )}

    </AdminLayout>
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value:
    | string
    | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">

      <div className="mb-4 w-fit rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-2.5 text-yellow-400">
        {icon}
      </div>

      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-white">
        {value}
      </p>

    </div>
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({
  status,
}: {
  status:
    InventoryItem["status"];
}) {
  const classes =
    status ===
    "In Stock"
      ? "bg-green-500/20 text-green-400"
      : status ===
        "Low Stock"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-red-500/20 text-red-400";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${classes}`}
    >
      {status}
    </span>
  );
}

// =====================================================
// TRANSACTION BADGE
// =====================================================

function TransactionBadge({
  type,
}: {
  type:
    StockTransactionType;
}) {
  const classes =
    type ===
    "Stock In"
      ? "bg-green-500/20 text-green-400"
      : type ===
        "Stock Out"
        ? "bg-red-500/20 text-red-400"
        : type ===
          "Initial Stock"
          ? "bg-blue-500/20 text-blue-400"
          : "bg-yellow-500/20 text-yellow-400";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${classes}`}
    >
      {type}
    </span>
  );
}

// =====================================================
// ACTION BUTTON
// =====================================================

function ActionButton({
  title,
  children,
  onClick,
  danger = false,
}: {
  title: string;
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`inline-flex rounded-lg p-2 transition ${
        danger
          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
          : "text-zinc-300 hover:bg-zinc-800 hover:text-yellow-400"
      }`}
    >
      {children}
    </button>
  );
}

// =====================================================
// TEXT FIELD
// =====================================================

function Field({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-zinc-400">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        disabled={disabled}
        placeholder={
          placeholder
        }
        className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400 disabled:opacity-50"
      />

    </div>
  );
}

// =====================================================
// NUMBER FIELD
// =====================================================

function NumberField({
  label,
  value,
  onChange,
  disabled,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (
    value: number
  ) => void;
  disabled?: boolean;
  min?: number;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold text-zinc-400">
        {label}
      </label>

      <input
        type="number"
        min={min}
        step="1"
        value={value}
        onChange={(e) =>
          onChange(
            Number(
              e.target.value
            ) || 0
          )
        }
        disabled={disabled}
        className="w-full rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-yellow-400 disabled:opacity-50"
      />

    </div>
  );
}