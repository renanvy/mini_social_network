class PostList extends React.Component {

  render () {
    let posts = this.props.posts.map((post) => {
      return (
        <Post
          key={post.id}
          currentUserId={this.props.currentUserId}
          onPostDelete={this.props.onPostDelete.bind(this)}
          onPostUpdate={this.props.onPostUpdate.bind(this)}
          {...post} />
      );
    });

    return (
      <div>
        {posts}
      </div>
    );
  }
}
