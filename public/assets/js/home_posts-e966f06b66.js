{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/posts/create",data:t.serialize(),success:function(t){let o=e(t.data.post);$("#posts-list-container>ul").prepend(o),n($(" delete-post-button"),o),new PostComments(t.data.post._id),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n                        <p>\n                             \n                                <small>\n                                    <a class="delete-post-button" href="/posts/destroy/${t._id}">&#9249;</a>\n                                </small> \n\n                                ${t.content}  \n                                <br>\n                                <small>\n                                ${t.user.name}\n                                </small>\n                        </p>\n                        <div class="post-comments">\n            \n                                <form action="/comments/create" method="POST">\n                                    <input type="text" name="content" placeholder="Add comment.."" required>\n                                    \x3c!-- <input type="hidden" name="post" value="<%= post._id %>"> --\x3e\n                                    <input type="hidden" name="post" value="${t._id}">\n                                    <input type="submit" value="Add comment">\n                                </form>\n                    \n                    \n                                    <div class="post-comments-list">\n                                        <ul id="post-comments-${t._id}>">\n                                            \n                                        </ul>\n                                    </div>\n                        </div>\n                 </li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),console.log("testing"),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){console.log(t),console.log($(`#post-${t.data.post_id}`)),$(`#post_${t.data.post_id}`).remove(),console.log("testing2"),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},o=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}