// here we create js file for fetch the data from form and send it in JSON formet to the action when ever we are
// submitting the form to create new post it not get submitted automatically it submited via jquery ajax

{
  // we need to create a function who recieve the data of created post and display it
  // here we are creatign a function who sends the data to the controller action
  // here we are taking id's from form in  home.ejs
  console.log("hello");
  // method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");
    console.log(newPostForm);
    // here when the from is submitted we don't want to submitted automatically so we need to use prevent default
    newPostForm.submit(function (e) {
      e.preventDefault();
      // here we are submitting the form manually by ajax

      $.ajax({
        type: "post",
        url: "/posts/create",
        // serialize -this convert the form data into json
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost=newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
          deletePost($(' .delete-post-button',newPost));
        },
        error: function (error) {
          console.log(error, responseText);
        },

        // once we submitted we are reciving the data in post controller
      });
    });
  };
  // method to create a post in DOM

  // we need a function which will help us in converting this HTML into JQERY object

  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
        <p>
          
          <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">XX</a>
          </small>
           ${post.content}
          <br />
          <small> 
          ${post.user.name} 
          </small>
        </p>
        <div class="post-comments">
          
          <form action="/comments/create" method="post">
            <input
              type="text"
              name="content"
              placeholder="Type Here to add comment..."
              required
            />
            <!-- this input name post is given us id for this post and name use in controller of comment -->
            <input type="hidden" name="post" value="${post._id}" />
            <input type="submit" value="Add comment" />
          </form>
          
      
          <div class="post-comments-list">
            <ul id="post-comments-${post._id}">
              
            </ul>
          </div>
        </div>
      </li>`);
  };

//   method to delete a post from dom
  let deletePost=function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type:'get',
            // by this we get the value of href of a tag
            url:$(deleteLink).prop('href'),
            success:function(data){
                $(`#post-${data.data.post_id}`).remove();
            },error:function(error){
                console.log(error.responseText);
            }
        });
    });
  }

  createPost();
}
