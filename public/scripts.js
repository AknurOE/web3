const list = document.getElementById("list");

async function fetchBlogs() {
  const res = await fetch("/blogs");
  const blogs = await res.json();
  list.innerHTML = "";

  blogs.forEach(b => {
    const li = document.createElement("li");
    li.innerHTML = `${b.title} 
      <button onclick="deleteBlog('${b._id}')">Delete</button>`;
    list.appendChild(li);
  });
}

async function createBlog() {
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;

  await fetch("/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body })
  });

  fetchBlogs();
}

async function deleteBlog(id) {
  await fetch(`/blogs/${id}`, { method: "DELETE" });
  fetchBlogs();
}

fetchBlogs();
