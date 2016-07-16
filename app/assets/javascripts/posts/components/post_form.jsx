class PostForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    let text = this.refs.text.value.trim();

    if (!text) {
      $(this.refs.text).notify("Não pode ficar em branco.", "error");
      return;
    }

    this.props.onPostSubmit(text);

    this.refs.text.value = "";
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)} id="new_post">
          <div className="row">
            <div className="col-md-12">
              <textarea
                ref="text"
                id="post_text"
                className="form-control"
                rows="5"
                placeholder="O que você está pensando?">
              </textarea>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-2">
              <input type="submit" value="Publicar" className="btn btn-success" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
