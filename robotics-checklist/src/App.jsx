import { useState } from "react";

const DEFAULT_LISTS = [
  {
    id: "coding", name: "Coding", emoji: "💻", color: "#00E5FF",
    items: ["Laptop", "Charger", "USB Hub", "Ethernet Cable", "Spare USB", "Code Backup Drive", "Mouse", "Headphones"]
  },
  {
    id: "mechanical", name: "Mechanical", emoji: "🔧", color: "#FF6B35",
    items: ["Wrench Set", "Zip Ties", "Duct Tape", "Spare Motors", "Screwdrivers", "Allen Keys", "Pliers", "Safety Glasses"]
  },
  {
    id: "pr", name: "PR", emoji: "📣", color: "#B39DDB",
    items: ["Team Banner", "Business Cards", "Notebook", "Pens", "Camera", "Tripod", "Team Shirts", "Presentation Clicker"]
  },
  {
    id: "3ddesign", name: "3D Design", emoji: "🖨️", color: "#66BB6A",
    items: ["Filament Spools", "Spare Nozzles", "Calipers", "Design Files USB", "Print Removal Tools", "Laptop", "Reference Prints"]
  }
];

export default function App() {
  const [lists, setLists] = useState(DEFAULT_LISTS);
  const [screen, setScreen] = useState("home");
  const [activeListId, setActiveListId] = useState(null);
  const [checklistItems, setChecklistItems] = useState([]);
  const [newItemText, setNewItemText] = useState("");
  const [newListName, setNewListName] = useState("");
  const [newListEmoji, setNewListEmoji] = useState("📦");
  const [showAddList, setShowAddList] = useState(false);
  const [checklistDone, setChecklistDone] = useState(false);

  const activeList = lists.find(l => l.id === activeListId);

  const openList = (id) => { setActiveListId(id); setScreen("list"); };

  const startChecklist = (listId) => {
    const list = lists.find(l => l.id === listId);
    if (!list || list.items.length === 0) return;
    setChecklistItems([...list.items].sort(() => Math.random() - 0.5));
    setChecklistDone(false);
    setActiveListId(listId);
    setScreen("checklist");
  };

  const dismissItem = (item) => {
    const next = checklistItems.filter(i => i !== item);
    setChecklistItems(next);
    if (next.length === 0) setChecklistDone(true);
  };

  const addItem = () => {
    if (!newItemText.trim()) return;
    setLists(prev => prev.map(l =>
      l.id === activeListId ? { ...l, items: [...l.items, newItemText.trim()] } : l
    ));
    setNewItemText("");
  };

  const removeItem = (item) => {
    setLists(prev => prev.map(l =>
      l.id === activeListId ? { ...l, items: l.items.filter(i => i !== item) } : l
    ));
  };

  const addList = () => {
    if (!newListName.trim()) return;
    const colors = ["#FF80AB", "#FFD740", "#40C4FF", "#69F0AE", "#FF6E40"];
    setLists(prev => [...prev, {
      id: "list-" + Date.now(), name: newListName.trim(), emoji: newListEmoji,
      color: colors[Math.floor(Math.random() * colors.length)], items: []
    }]);
    setNewListName(""); setNewListEmoji("📦"); setShowAddList(false);
  };

  const deleteList = (id) => {
    setLists(prev => prev.filter(l => l.id !== id));
    setScreen("home");
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#0D0D0D", minHeight: "100dvh", maxWidth: 430, margin: "0 auto", color: "#F0F0F0" }}>

      {/* HEADER */}
      <div style={{ padding: "52px 24px 16px", background: "linear-gradient(180deg,#1A1A1A,#0D0D0D)", borderBottom: "1px solid #1E1E1E" }}>
        {screen !== "home" && (
          <button onClick={() => setScreen(screen === "checklist" ? "list" : "home")}
            style={{ background: "none", border: "none", color: "#666", fontSize: 13, cursor: "pointer", padding: "0 0 10px", display: "flex", alignItems: "center", gap: 6 }}>
            ← Back
          </button>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 4 }}>
              {screen === "home" ? "Competition Prep" : screen === "checklist" ? "Packing Mode" : activeList?.name}
            </div>
            <h1 style={{ margin: 0, fontSize: screen === "home" ? 26 : 22, fontWeight: 700 }}>
              {screen === "home" ? "⚙️ Gear Bags" : screen === "checklist" ? "📦 Pack It Up" : `${activeList?.emoji} ${activeList?.name}`}
            </h1>
          </div>
          {screen === "list" && activeList && (
            <button onClick={() => startChecklist(activeListId)}
              style={{ background: activeList.color, border: "none", borderRadius: 20, color: "#000", padding: "10px 18px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
              PACK →
            </button>
          )}
        </div>
      </div>

      {/* HOME SCREEN */}
      {screen === "home" && (
        <div style={{ padding: "20px 20px 140px" }}>
          <div style={{ fontSize: 10, color: "#444", marginBottom: 16, letterSpacing: 3 }}>
            {lists.length} DEPARTMENT{lists.length !== 1 ? "S" : ""}
          </div>

          {lists.map(list => (
            <div key={list.id} style={{ background: "#161616", border: "1px solid #222", borderLeft: `4px solid ${list.color}`, borderRadius: 16, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "16px 16px 16px 20px" }}>
                <div style={{ fontSize: 28, marginRight: 14 }}>{list.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{list.name}</div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{list.items.length} items</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => openList(list.id)} style={{ background: "#222", border: "none", borderRadius: 10, color: "#CCC", padding: "8px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Edit</button>
                  <button onClick={() => startChecklist(list.id)} style={{ background: list.color, border: "none", borderRadius: 10, color: "#000", padding: "8px 14px", fontSize: 12, cursor: "pointer", fontWeight: 700 }}>Pack</button>
                </div>
              </div>
              {list.items.length > 0 && (
                <div style={{ padding: "0 16px 14px 20px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {list.items.slice(0, 4).map(item => (
                    <span key={item} style={{ background: "#1E1E1E", border: "1px solid #2A2A2A", borderRadius: 8, padding: "3px 10px", fontSize: 11, color: "#777" }}>{item}</span>
                  ))}
                  {list.items.length > 4 && <span style={{ fontSize: 11, color: "#444", alignSelf: "center" }}>+{list.items.length - 4} more</span>}
                </div>
              )}
            </div>
          ))}

          {showAddList ? (
            <div style={{ background: "#161616", border: "1px dashed #2A2A2A", borderRadius: 16, padding: 20, marginTop: 4 }}>
              <div style={{ fontSize: 10, color: "#555", marginBottom: 12, letterSpacing: 3 }}>NEW DEPARTMENT</div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <input value={newListEmoji} onChange={e => setNewListEmoji(e.target.value)} maxLength={2}
                  style={{ width: 52, background: "#111", border: "1px solid #2A2A2A", borderRadius: 10, color: "#FFF", padding: 10, fontSize: 20, textAlign: "center", outline: "none" }} />
                <input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="Department name..."
                  onKeyDown={e => e.key === "Enter" && addList()}
                  style={{ flex: 1, background: "#111", border: "1px solid #2A2A2A", borderRadius: 10, color: "#FFF", padding: "10px 14px", fontSize: 14, outline: "none" }} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={addList} style={{ flex: 1, background: "#F0F0F0", border: "none", borderRadius: 10, color: "#000", padding: 12, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Create</button>
                <button onClick={() => setShowAddList(false)} style={{ background: "#222", border: "none", borderRadius: 10, color: "#888", padding: "12px 16px", fontSize: 13, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAddList(true)} style={{ width: "100%", background: "transparent", border: "1px dashed #222", borderRadius: 16, color: "#383838", padding: 16, fontSize: 13, cursor: "pointer", marginTop: 4, letterSpacing: 2 }}>
              + ADD DEPARTMENT
            </button>
          )}
        </div>
      )}

      {/* LIST SCREEN */}
      {screen === "list" && activeList && (
        <div style={{ padding: "20px 20px 140px" }}>
          <div style={{ fontSize: 10, color: "#444", marginBottom: 16, letterSpacing: 3 }}>{activeList.items.length} ITEMS</div>

          {activeList.items.length === 0 && (
            <div style={{ textAlign: "center", color: "#383838", padding: "48px 0", fontSize: 14 }}>No items yet — add some below</div>
          )}

          {activeList.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", background: "#161616", border: "1px solid #222", borderRadius: 12, padding: "14px 16px", marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: activeList.color, marginRight: 14, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 15 }}>{item}</span>
              <button onClick={() => removeItem(item)} style={{ background: "none", border: "none", color: "#383838", fontSize: 20, cursor: "pointer", padding: "0 4px" }}>×</button>
            </div>
          ))}

          <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#0F0F0F", borderTop: "1px solid #1E1E1E", padding: "16px 20px 40px" }}>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={newItemText} onChange={e => setNewItemText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addItem()} placeholder="Add item..."
                style={{ flex: 1, background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 12, color: "#FFF", padding: "13px 16px", fontSize: 14, outline: "none" }} />
              <button onClick={addItem} style={{ background: activeList.color, border: "none", borderRadius: 12, color: "#000", padding: "13px 20px", fontWeight: 700, fontSize: 16, cursor: "pointer" }}>+</button>
            </div>
            <button onClick={() => deleteList(activeListId)} style={{ marginTop: 10, width: "100%", background: "none", border: "none", color: "#2A2A2A", fontSize: 11, cursor: "pointer", letterSpacing: 2 }}>
              DELETE THIS LIST
            </button>
          </div>
        </div>
      )}

      {/* CHECKLIST SCREEN */}
      {screen === "checklist" && (
        <div style={{ padding: "30px 24px 100px", textAlign: "center" }}>
          {checklistDone ? (
            <div style={{ paddingTop: 80 }}>
              <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>All packed!</div>
              <div style={{ fontSize: 14, color: "#555", marginBottom: 40 }}>{activeList?.name} is ready for competition.</div>
              <button onClick={() => setScreen("list")} style={{ background: activeList?.color, border: "none", borderRadius: 20, color: "#000", padding: "14px 40px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Done →
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 10, color: "#444", letterSpacing: 3, marginBottom: 6 }}>{checklistItems.length} REMAINING</div>
              <div style={{ fontSize: 13, color: "#383838", marginBottom: 36 }}>Tap an item when it is packed</div>

              {checklistItems.length > 0 && (
                <div
                  onClick={() => dismissItem(checklistItems[0])}
                  onPointerDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                  onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
                  style={{ background: "#161616", border: `2px solid ${activeList?.color}`, borderRadius: 24, padding: "48px 32px", marginBottom: 20, cursor: "pointer", userSelect: "none", boxShadow: `0 0 60px ${activeList?.color}1A`, transition: "transform 0.08s ease" }}>
                  <div style={{ fontSize: 10, color: "#555", marginBottom: 12, letterSpacing: 3 }}>PACK THIS</div>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{checklistItems[0]}</div>
                  <div style={{ marginTop: 18, fontSize: 10, color: activeList?.color, letterSpacing: 3 }}>TAP WHEN PACKED</div>
                </div>
              )}

              {checklistItems.slice(1, 4).map((item, i) => (
                <div key={item} onClick={() => dismissItem(item)}
                  style={{ background: "#111", border: "1px solid #1E1E1E", borderRadius: 14, padding: "14px 20px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", opacity: 1 - i * 0.25, textAlign: "left" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2A2A2A", marginRight: 14 }} />
                  <span style={{ fontSize: 14, color: "#555" }}>{item}</span>
                </div>
              ))}

              {checklistItems.length > 4 && (
                <div style={{ fontSize: 10, color: "#2A2A2A", marginTop: 8, letterSpacing: 3 }}>+{checklistItems.length - 4} MORE</div>
              )}
            </>
          )}
        </div>
      )}

    </div>
  );
}
