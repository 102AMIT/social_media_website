// here we create js file for fetch the data from form and send it in JSON formet to the action when ever we are 
// submitting the form to create new post it not get submitted automatically it submited via jquery ajax

{
    // we need to create a function who recieve the data of created post and display it 
    // here we are creatign a function who sends the data to the controller action
    // here we are taking id's from form in  home.ejs 
    console.log('hello');
    // method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm=$('#new-post-form');
        console.log(newPostForm);
        // here when the from is submitted we don't want to submitted automatically so we need to use prevent default
        newPostForm.submit(function(e){
            e.preventDefault();
            // here we are submitting the form manually by ajax

            $.ajax({
                type:'post',
                url:'/posts/create',
                // serialize -this convert the form data into json
                data:newPostForm.serialize(),
                success:function(data){
                    console.log(data);
                },error:function(error){
                    console.log(error,responseText);
                }

                // once we submitted we are reciving the data in post controller

            });
        });   

    }
    // method to create a post in DOM
    createPost();
    
}

