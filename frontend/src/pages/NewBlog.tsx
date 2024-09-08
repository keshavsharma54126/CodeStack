import axios from "axios";
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/Appbar";
import { BACKEND_URL, MISTRAL_URL } from "../config";
import Mistral from "@mistralai/mistralai";
import { storage, firestore } from "../firebaseConfig"; // Import Firebase storage and Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Quill from "quill";

const customColors = [
  "#000000",
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

const modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: customColors }, { background: customColors }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      image: async function (this: any) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            try {
              const snapshot = await uploadBytes(storageRef, file);
              const downloadURL = await getDownloadURL(snapshot.ref);

              // Save image URL to Firestore
              await addDoc(collection(firestore, "images"), {
                url: downloadURL,
                timestamp: serverTimestamp(),
              });

              const quill = this.quill;
              const range = quill.getSelection(true);
              const index = range ? range.index : 0;

              quill.insertEmbed(
                index,
                "image",
                downloadURL,
                Quill.sources.USER
              );
              quill.setSelection(index + 1);

              // Add custom class to the inserted image
              const image = quill.container.querySelector(
                `img[src="${downloadURL}"]`
              );
              if (image) {
                image.classList.add("custom-quill-image");

                // Create a remove button
                const removeButton = document.createElement("button");
                removeButton.innerHTML = "✖"; // Cross icon
                removeButton.className = "remove-image-button"; // Use Tailwind classes
                removeButton.style.display = "none"; // Initially hidden
                removeButton.onclick = () => {
                  quill.deleteText(index, 1); // Remove the image
                  image.remove(); // Remove the image element
                  removeButton.remove(); // Remove the button itself
                };

                // Show the remove button on hover
                image.parentNode?.insertBefore(removeButton, image.nextSibling);
                image.addEventListener("mouseenter", () => {
                  removeButton.style.display = "block"; // Show on hover
                });
                image.addEventListener("mouseleave", () => {
                  removeButton.style.display = "none"; // Hide when not hovering
                });
              }
            } catch (error) {
              console.error("Failed to upload image: ", error);
            }
          }
        };
      },
    },
  },
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "header",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "link",
  "image",
  "video",
];

const NewBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill
        .getModule("toolbar")
        .addHandler("image", modules.toolbar.handlers.image.bind({ quill }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 ">
      <AppBar />
      <div className="mt-48 md:mt-10 container mx-auto my-auto p-4 sm:p-8">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl min-h-4xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8 text-center">
            Create New Blog
          </h1>

          <div className="mb-20">
            <label
              className="block text-gray-700 text-xl font-bold mb-4"
              htmlFor="title">
              Title
            </label>
            <ReactQuill
              id="title"
              modules={modules}
              formats={formats}
              value={title}
              onChange={(value: string) => {
                setTitle(value);
              }}
              placeholder="Enter blog title"
              className="h-20 mb-4"
            />
          </div>

          <div className="mt-32 md:mt-1">
            <label
              className=" mt-32 md:mt-1 block text-gray-700 text-xl font-bold mb-4 "
              htmlFor="content">
              Blog Content
            </label>
            <ReactQuill
              id="content"
              ref={quillRef}
              modules={modules}
              formats={formats}
              value={content}
              onChange={(value: string) => {
                setContent(value);
              }}
              placeholder="Write your blog content here..."
              className="h-96 mb-4"
            />
          </div>
          <div className="flex flex-row items-center justify-center mt-14 md:mt-0">
            <div className="mt-20">
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      navigate("/signup");
                    }

                    if (title.trim() == "") {
                      alert("Title of the blog can not be Empty");
                      return;
                    }
                    if (content.trim() == "") {
                      alert("Content of the blog can not be empty");
                      return;
                    }
                    const response = await axios.post(
                      `${BACKEND_URL}/api/v1/blog/new`,
                      {
                        title,
                        content,
                      },
                      {
                        headers: {
                          Authorization: localStorage.getItem("token"),
                        },
                      }
                    );
                    const id = response.data.id;
                    navigate(`/blog/${id}`);
                  } catch (error) {
                    console.log("Error adding blog:", error);
                  }
                }}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Add Blog
              </button>
            </div>
            <div className="mt-20">
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      navigate("/signup");
                    }

                    if (title.trim() == "") {
                      alert(
                        "Title of the blog can not be empty if you want to use the Generate Using AI Feature"
                      );
                      return;
                    }
                    setContent("GENERATING CONTENT USING AI ................");
                    const apiKey = MISTRAL_URL;

                    const client = new Mistral(apiKey);

                    const chatStreamResponse = await client.chatStream({
                      model: "mistral-small-latest",
                      messages: [
                        {
                          role: "user",
                          content: `You are a skilled writer and expert in creating engaging and elegant blog content. Your task is to generate a blog post based on the following title:
                              
                              The blog should be around 5000 words and should captivate the reader with a compelling introduction, informative body, and a thoughtful conclusion. Use a sophisticated yet accessible writing style, incorporating rich vocabulary, smooth transitions, and varied sentence structures. Ensure the content is well-researched, accurate, and adds value to the reader.
                              
                              Structure:
                              1. Introduction: Present the topic in an engaging manner, capturing the reader's attention and providing a clear thesis statement.
                              2. Main Body: 
                                  - First Section: Introduce the main points, provide background information, and explain the relevance of the topic.
                                  - Second Section: Dive deeper into specific aspects, providing detailed explanations, examples, and insights.
                                  - Third Section: Explore additional related points, consider counterarguments, and offer unique perspectives.
                              3. Conclusion: Summarize the key points discussed, restate the importance of the topic, and leave the reader with a final thought or call to action.
                              
                              Tone and Style:
                              - Sophisticated and elegant
                              - Engaging and informative
                              - Clear and concise
                              - Thoughtful and reflective
                              
                              Ensure the blog is well-organized and proofread for grammar and spelling errors. Use proper formatting for headings, subheadings, and paragraphs. Avoid using jargon or overly complex language that may alienate the reader. Instead, aim for clarity and elegance in your writing.
                              Also make sure to use proper fonts,headings,formattings,bolds etc like a proper article written by a professional and eddited using a professional edditor and in the end don't use the terms like main body ,first section and all those things that i have used in this prompt to describe how the blog should be 
                              
                              Begin the blog with the following title: ${title}`,
                        },
                      ],
                    });

                    let blogContent = "";
                    console.log(chatStreamResponse);
                    for await (const chunk of chatStreamResponse) {
                      if (chunk.choices[0].delta.content !== undefined) {
                        blogContent += chunk.choices[0].delta.content;
                      }
                    }
                    setContent(blogContent);
                  } catch (error) {
                    console.log("Error adding blog:", error);
                  }
                }}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Generate Using AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
