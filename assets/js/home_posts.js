{

    // Method to submit new form data for new post using ajax
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: "/posts/create",
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' delete-post-button'), newPost);

                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);

                }

            });

        });
    }

    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
                        <p>
                             
                                <small>
                                    <a class="delete-post-button" href="/posts/destroy/${post._id}">&#9249;</a>
                                </small> 

                                ${post.content}  
                                <br>
                                <small>
                                ${post.user.name}
                                </small>
                        </p>
                        <div class="post-comments">
            
                                <form action="/comments/create" method="POST">
                                    <input type="text" name="content" placeholder="Add comment.."" required>
                                    <!-- <input type="hidden" name="post" value="<%= post._id %>"> -->
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add comment">
                                </form>
                    
                    
                                    <div class="post-comments-list">
                                        <ul id="post-comments-${post._id}>">
                                            
                                        </ul>
                                    </div>
                        </div>
                 </li>`)
    }


    //   Method to delete a post from DOM
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            console.log('testing');
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    console.log(data);
                    console.log($(`#post-${data.data.post_id}`))
                    $(`#post_${data.data.post_id}`).remove();
                    console.log('testing2');
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });

        });
    }


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function () {
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();





    // Method to create a post in DOM
    // createPost(); 
}