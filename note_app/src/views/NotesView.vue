<script setup lang="ts">
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()
const showNewNoteDialog = ref(false)
const newNote = ref({ title: '', content: '', category: '' })

const createNote = () => {
  if (newNote.value.title.trim() && newNote.value.content.trim()) {
    notesStore.addNote(
      newNote.value.title,
      newNote.value.content,
      newNote.value.category
    )
    newNote.value = { title: '', content: '', category: '' }
    showNewNoteDialog.value = false
  }
}
</script>

<template>
  <div class="notes-container">
    <!-- Search and Filter Section -->
    <div class="search-section">
      <input
        type="text"
        v-model="notesStore.searchQuery"
        placeholder="Search notes..."
        class="search-input"
      />
      <div class="categories-filter">
        <span
          v-for="category in notesStore.categories"
          :key="category"
          :class="['category-chip', { active: notesStore.selectedCategory === category }]"
          @click="notesStore.setSelectedCategory(category === notesStore.selectedCategory ? '' : category)"
        >
          {{ category || 'Uncategorized' }}
        </span>
      </div>
    </div>

    <!-- Notes Grid -->
    <div class="notes-grid">
      <div
        v-for="note in notesStore.filteredNotes"
        :key="note.id"
        class="note-card"
      >
        <div class="note-header">
          <h3>{{ note.title }}</h3>
          <span class="category-label">{{ note.category || 'Uncategorized' }}</span>
        </div>
        <p class="note-content">{{ note.content }}</p>
        <div class="note-footer">
          <span class="date">{{ new Date(note.updatedAt).toLocaleDateString() }}</span>
          <div class="actions">
            <button @click="notesStore.deleteNote(note.id)" class="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <button class="fab" @click="showNewNoteDialog = true">+</button>

    <!-- New Note Dialog -->
    <div v-if="showNewNoteDialog" class="dialog-overlay">
      <div class="dialog">
        <h2>New Note</h2>
        <input
          v-model="newNote.title"
          placeholder="Title"
          class="dialog-input"
        />
        <textarea
          v-model="newNote.content"
          placeholder="Note content..."
          class="dialog-input"
          rows="4"
        ></textarea>
        <input
          v-model="newNote.category"
          placeholder="Category (optional)"
          class="dialog-input"
        />
        <div class="dialog-actions">
          <button @click="showNewNoteDialog = false" class="cancel-btn">Cancel</button>
          <button @click="createNote" class="create-btn">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notes-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-section {
  margin-bottom: 24px;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #4A90E2;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 16px;
}

.categories-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-chip.active {
  background-color: #4A90E2;
  color: white;
}

.notes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.note-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}

.note-header h3 {
  margin: 0;
  color: #333;
}

.category-label {
  font-size: 12px;
  padding: 4px 8px;
  background-color: #F5A623;
  color: white;
  border-radius: 12px;
}

.note-content {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.4;
}

.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.actions {
  display: flex;
  gap: 8px;
}

.delete-btn {
  padding: 4px 8px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4A90E2;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.fab:hover {
  transform: scale(1.1);
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  background-color: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.dialog h2 {
  margin-bottom: 16px;
  color: #333;
}

.dialog-input {
  width: 100%;
  margin-bottom: 16px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.cancel-btn, .create-btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #666;
}

.create-btn {
  background-color: #4A90E2;
  color: white;
}
</style>
