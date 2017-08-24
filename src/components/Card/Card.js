import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import CodeBlock from '../Post/CodeBlock';

const Card = ({ user, post }) => {
  const codeBlock = Object.assign({}, {
    CodeBlock
  });

  const date = new Date(post.postTimestamp);
  const editButton = (user && user.uid === post.user_id) ?
      <Link className="edit-button" to={`/edit/${post.key}`}>Edit</Link>
        : '';
  return (
      <div className="card">
          <Link className="view-button" to={`/view/${post.key}`}>{post.title}</Link>
          {editButton}
          <p className="date-style">{`Post on ${date.toDateString()}`}</p>
          <ReactMarkdown
            source={post.body}
            renderers={codeBlock}
            skipHtml
            escapeHtml
          />
      </div>
    );
};

Card.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default Card;
