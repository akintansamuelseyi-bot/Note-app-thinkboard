import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";

const Createpage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Fields are required");
      return;
    }
    setLoading(true);

    try {
      const res = await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note created successfully");
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      toast.error("Failed creating note");
      if (error.response?.status === 429) {
        toast.error("Slow down youre creating too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a Note</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered w-full h-40"
          />

          <button type="submit" className="btn btn-primary justify-end">
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createpage;
