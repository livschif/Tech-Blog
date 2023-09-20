const newPostHandler = async (event) => {
    event.preventDefault();
  
    const postTitle = document.querySelector('#post-title').value.trim();
    const postContent = document.querySelector('#post-content').value.trim();
  
    if (postTitle && postContent) {
      const response = await fetch(`/api/dashboard`, {
        method: 'POST',
        body: JSON.stringify({ postTitle, postContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);