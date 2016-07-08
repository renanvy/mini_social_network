//= require_tree ./posts/components/
//= require_tree ./comments/components/
//= require_tree ./likes/components/

ReactDOM.render(
  React.createElement(
    PostContainer,
    { currentUserId: window.currentUserId, currentUserName: window.currentUserName }
  ), document.getElementById("feed")
);
