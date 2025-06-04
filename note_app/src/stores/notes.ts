import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Note {
  id: string
  title: string
  content: string
  category: string
  createdAt: Date
  updatedAt: Date
}

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const searchQuery = ref('')
  const selectedCategory = ref('')

  // Computed property for filtered notes
  const filteredNotes = computed(() => {
    return notes.value
      .filter(note => 
        (searchQuery.value === '' || 
         note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
         note.content.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
        (selectedCategory.value === '' || note.category === selectedCategory.value)
      )
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  })

  // Get unique categories from notes
  const categories = computed(() => {
    const uniqueCategories = new Set(notes.value.map(note => note.category))
    return Array.from(uniqueCategories).filter(Boolean)
  })

  // Add a new note
  function addNote(title: string, content: string, category: string = '') {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      category,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    notes.value.push(newNote)
  }

  // Update an existing note
  function updateNote(id: string, updates: Partial<Note>) {
    const noteIndex = notes.value.findIndex(note => note.id === id)
    if (noteIndex !== -1) {
      notes.value[noteIndex] = {
        ...notes.value[noteIndex],
        ...updates,
        updatedAt: new Date()
      }
    }
  }

  // Delete a note
  function deleteNote(id: string) {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  // Set search query
  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  // Set selected category
  function setSelectedCategory(category: string) {
    selectedCategory.value = category
  }

  return {
    notes,
    filteredNotes,
    categories,
    searchQuery,
    selectedCategory,
    addNote,
    updateNote,
    deleteNote,
    setSearchQuery,
    setSelectedCategory
  }
})
