import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function ClickListener({ children, onClickOutside }) {
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClickOutside();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
  }, [onClickOutside]);

  return <div ref={containerRef}>{children}</div>;
}

ClickListener.propTypes = {
    children: PropTypes.node.isRequired,
    onClickOutside: PropTypes.func.isRequired
}

export default ClickListener;