# fe-taskify

### Directory Architecture
```
/fe-taskify
│
├── `index.html`                # Main HTML file
│
├── `assets`                    # Static files (images, fonts, etc.)
│   ├── `images`                # Image files
│   └── `fonts`                 # Font files
│
├── `css`                       # Style files
│   ├── `base.css`              # Base styles
│   ├── `header.css`            # Header styles
│   ├── `footer.css`            # Footer styles
│   ├── `main.css`              # Main page styles
│   ├── `card.css`              # Card styles
│   ├── `modal.css`             # Modal styles
│   ├── `animations.css`        # Animation styles
│   ├── `history.css`           # History modal styles
│   └── `column.css`            # Column styles ( card lists )
│
├── `js`                    # JavaScript files ( Can be divided into more directories )
│   ├── storage          # Storage and history management functions (add, delete, edit, undo, redo, etc.)
│   ├── card               # Card functions (add, delete, edit, drag, drop, etc.)
│   ├── column          # Column management functions (add, delete, rename, etc.)
│   ├── history         # History management functions (undo, redo, etc.)
│   ├── modal            # Modal functions (open, close, etc.)
│   ├── fab                # FAB button functions (add column, delete column, undo, redo, etc.)
│   └── main.js           # Main JavaScript file
│
├── `data`                      # Data storage files (e.g., `localStorage.js` if using local storage)
    
```
### Development Plan
0. Super Simple Layout ✅
1. Storage setting (add , delete, edit, redo ..,,etc )
2. Task adding  
3. Card Sorting
4. Card editing ( + delete)
5. Card moving
6. History manager
7. Column manager
8. FAB button
9. Design 
10. Refactor
---

### Things to do 

- [x] Skeleton Layout
  - [x] Header
  - [x] Main
  - [x] Footer
---
- [ ] storage
    - [ ] Add
    - [ ] Delete
    - [ ] Edit
    - [ ] Move
    - [ ] Undo
    - [ ] Redo
    - [ ] Make API
---
- [ ] Header
  - [ ] Logo
  - [ ] History Modal
    - [ ] Pop up
    - [ ] List of Tasks
    - [ ] Clear History
      - [ ] Warning Modal
    - [ ] Close Modal
    - [ ] Animation
    - [ ] Bold for important words
--- 
- [ ] Main
  - [ ] Card Move
    - [ ] Drag
    - [ ] Drop
  - [ ] Sort
    - [ ] 생성 순
    - [ ] 최신 순
    - [ ] animation
  - [ ] Card
    - [ ] delete
      - [ ] warning modal
    - [ ] edit
      - [ ] edit modal
  - [ ] CardList (Column)
    - [ ] Skeleton 
    - [ ] Count of Cards
    - [ ] Add Card
    - [ ] Delete Card
    - [ ] Edit Column Name
    - [ ] OverFlow Control
      - [ ] Scroll
---
- [ ] Footer
  - [ ] FAB btn
    - [ ] Add Column
      - [ ] Add Column Modal
    - [ ] Delete Column
      - [ ] Warning Modal
    - [ ] Undo
    - [ ] Redo
---
 