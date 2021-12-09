import React from 'react';
import ReactDOM from 'react-dom'


class CommentBox extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showComments: false,
        comments: [
          {id: 1, author: "user1", body: "ipsom blah blah "},
          {id: 2, author: "user2335", body: "jhhj.."},
          {id: 3, author: "user0", body: "Is this hardcoded?"}
        ]
      };
    }
    
    render () {
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <div className="comment-box">
          <h2>Leave a comment:</h2>
          <CommentForm addComment={this._addComment.bind(this)}/>
          <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
            {buttonText}
          </button>
          <h3>Comments</h3>
          <h4 className="comment-count">
            {this._getCommentsTitle(comments.length)}
          </h4>
          {commentNodes}
        </div>  
      );
    } 
    _addComment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        author,
        body
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); 
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {    
      return this.state.comments.map((comment) => { 
        // return (
        //   <Comment 
        //     author={comment.author} 
        //     body={comment.body} 
        //     key={comment.id} />
        // ); 
      });
    }
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } 
  
  class CommentForm extends React.Component {
    render() {
      return (
        <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="comment-form-fields">
            <input placeholder="Name" required ref={(input) => this._author = input}></input><br />
            <textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></textarea>
          </div>
          <div className="comment-form-actions">
            <button type="submit">Post Comment</button>
          </div>
        </form>
      );
    } 
    
    _handleSubmit(event) { 
      event.preventDefault();   
      let author = this._author;
      let body = this._body;
      this.props.addComment(author.value, body.value);
    }
  } 
  
  export default CommentBox;
//   ReactDOM.render(<CommentBox />, document.getElementById('main'));