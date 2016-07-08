class PostContainer extends React.Component {

  constructor (props) {
    super(props);

    this.state = { posts: [] }
  }

  componentDidMount () {
    this.loadPosts();
  }

  loadPosts () {
    $.ajax({
      method: "get",
      dataType: "json",
      url: "/posts",
      success: (data, textStatus, jqXHR) => {
        this.setState({ posts: data });
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao carregar os posts", "error");
      }
    });
  }

  handlePostSubmit(text) {
    $.ajax({
      method: "POST",
      dataType: "json",
      url: "/posts",
      data: {
        post: { text: text }
      },
      success: (data, textStatus, jqXHR) => {
        this.loadPosts();
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao criar o post", "error");
      }
    });
  }

  handlePostDelete (postId) {
    let posts = this.state.posts;

    let newPosts = posts.filter((post) => {
      if (post.id !== postId) {
        return true;
      } else {
        return false;
      }
    });

    this.setState({ posts: newPosts });

    $.ajax({
      method: "DELETE",
      url: `/posts/${postId}`,
      success: (data, textStatus, jqXHR) => {
        this.loadPosts();
      },
      error: (jqXHR, textStatus) => {
        this.setState({ posts: posts });
        $.notify("Erro ao remover o post", "error");
      }
    });
  }

  handlePostUpdate (postId, text) {
    $.ajax({
      method: "PUT",
      dataType: "json",
      url: `/posts/${postId}`,
      data: {
        post: { text: text }
      },
      success: (data, textStatus, jqXHR) => {
        this.loadPosts();
      },
      error: (jqXHR, textStatus) => {
        $.notify("Erro ao atualizar o post", "error");
      }
    });
  }

  render () {
    return (
      <div>
        <PostForm onPostSubmit={this.handlePostSubmit.bind(this)} />

        <hr />

        <PostList
          currentUserId={this.props.currentUserId}
          onPostDelete={this.handlePostDelete.bind(this)}
          onPostUpdate={this.handlePostUpdate.bind(this)}
          posts={this.state.posts}
        />
      </div>
    );
  }
}
