import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const initialBooks = [
  { id: 1, title: "The Great Gatsby", category: "Fiction", borrowed: false },
  { id: 2, title: "Clean Code", category: "Programming", borrowed: true },
  { id: 3, title: "Atomic Habits", category: "Self-Help", borrowed: false },
];

export default function BookLibraryApp() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [newBook, setNewBook] = useState({ title: "", category: "" });

  const toggleBorrow = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, borrowed: !book.borrowed } : book
      )
    );
  };

  const addBook = () => {
    if (newBook.title && newBook.category) {
      setBooks([
        ...books,
        { id: books.length + 1, title: newBook.title, category: newBook.category, borrowed: false },
      ]);
      setNewBook({ title: "", category: "" });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📚 Personal Book Library</h1>
      <Input
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        className="mb-4"
      />
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Book Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <Input
          placeholder="Category"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
        />
        <Button onClick={addBook}>Add Book</Button>
      </div>
      <div className="grid gap-4">
        {books
          .filter((book) => book.title.toLowerCase().includes(search))
          .map((book) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`p-4 ${book.borrowed ? "bg-green-100" : ""}`}>
                <CardContent>
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-sm text-gray-500">Category: {book.category}</p>
                  <Button className="mt-2" onClick={() => toggleBorrow(book.id)}>
                    {book.borrowed ? "Return" : "Borrow"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
