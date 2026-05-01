"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Undo, 
  Redo 
} from "lucide-react";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 p-4 border-b border-white/5 bg-white/5">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("bold") ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("italic") ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <Heading2 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("bulletList") ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("orderedList") ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-lg transition-colors ${editor.isActive("blockquote") ? "bg-brand-primary text-white" : "hover:bg-white/10"}`}
      >
        <Quote size={18} />
      </button>
      <div className="w-px h-8 bg-white/10 mx-2" />
      <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-white/10 rounded-lg">
        <Undo size={18} />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-white/10 rounded-lg">
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function BlogEditor({ content, onChange }: { content: string; onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-none p-6 outline-none min-h-[400px]",
      },
    },
  });

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
