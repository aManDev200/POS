import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './BusinessScreen.module.css';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  unit: string;
  lastUpdated: string;
}

interface EditingItem extends InventoryItem {
  newQuantity: number;
}

const BusinessScreen: React.FC = () => {
  const { setCurrentScreen } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Product A',
      category: 'Electronics',
      quantity: 50,
      price: 999,
      unit: 'pieces',
      lastUpdated: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Product B',
      category: 'Clothing',
      quantity: 100,
      price: 499,
      unit: 'pieces',
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id' | 'lastUpdated'>>({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    unit: 'pieces'
  });

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newInventoryItem: InventoryItem = {
      id: Date.now().toString(),
      ...newItem,
      lastUpdated: new Date().toISOString()
    };
    setInventoryItems([...inventoryItems, newInventoryItem]);
    setNewItem({
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      unit: 'pieces'
    });
    setShowAddForm(false);
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditingItemId(item.id);
    setEditingItem({ ...item, newQuantity: item.quantity });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditingItem(null);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      setInventoryItems(items =>
        items.map(item =>
          item.id === editingItem.id
            ? {
                ...item,
                quantity: editingItem.newQuantity,
                lastUpdated: new Date().toISOString()
              }
            : item
        )
      );
      setEditingItemId(null);
      setEditingItem(null);
    }
  };

  const handleQuantityChange = (change: number) => {
    if (editingItem) {
      const newQuantity = Math.max(0, editingItem.newQuantity + change);
      setEditingItem({ ...editingItem, newQuantity });
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));

  return (
    <div className={styles.businessScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          aria-label="Back"
        >
          ←
        </button>
        <h2>Inventory Management</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.actions}>
          <button 
            className={styles.addButton}
            onClick={() => setShowAddForm(true)}
          >
            + Add New Item
          </button>
          <div className={styles.filters}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.categoryFilter}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {showAddForm && (
          <div className={styles.formOverlay}>
            <div className={styles.formContainer}>
              <h3>Add New Item</h3>
              <form onSubmit={handleAddItem}>
                <div className={styles.formGroup}>
                  <label>Item Name</label>
                  <input
                    type="text"
                    required
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <input
                    type="text"
                    required
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Quantity</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Unit</label>
                    <select
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    >
                      <option value="pieces">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="liters">Liters</option>
                      <option value="boxes">Boxes</option>
                    </select>
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="button" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </button>
                  <button type="submit">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className={styles.inventoryGrid}>
          {filteredItems.map(item => (
            <div key={item.id} className={styles.inventoryCard}>
              <div className={styles.itemHeader}>
                <h3>{item.name}</h3>
                <span className={styles.category}>{item.category}</span>
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.detail}>
                  <span className={styles.label}>Quantity</span>
                  {editingItemId === item.id ? (
                    <div className={styles.quantityControl}>
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        disabled={editingItem?.newQuantity <= 0}
                      >
                        -
                      </button>
                      <span>{editingItem?.newQuantity} {item.unit}</span>
                      <button onClick={() => handleQuantityChange(1)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <span>{item.quantity} {item.unit}</span>
                  )}
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Price</span>
                  <span>₹{item.price.toLocaleString()}</span>
                </div>
                <div className={styles.detail}>
                  <span className={styles.label}>Last Updated</span>
                  <span>{new Date(item.lastUpdated).toLocaleDateString()}</span>
                </div>
                <div className={styles.itemActions}>
                  {editingItemId === item.id ? (
                    <>
                      <button 
                        className={styles.saveButton}
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                      <button 
                        className={styles.cancelButton}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      className={styles.editButton}
                      onClick={() => handleEditClick(item)}
                    >
                      Edit Quantity
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessScreen; 