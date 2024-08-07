

// function Message_btn(){


import React, { useState, useRef, useEffect } from 'react';
import "../css/message_btn.css"
const  Message_btn = () => {
  const [messages, setMessages] = useState([
    { type: 'received', text: 'This codepen is an example of' },
    { type: 'received', text: 'how to create the Facebook thumb up' },
    { type: 'sent', text: 'Try to type' },
    { type: 'sent', text: 'or click the thumb up!' },
    { type: 'sent', text: ';)' },
    { type: 'received', text: 'Enjoy!' }
  ]);
  const [currentText, setCurrentText] = useState('');
  const conversationRef = useRef(null);
  const thumbRef = useRef(null);
  const [thumbSize, setThumbSize] = useState(20);
  const [thumbAnimating, setThumbAnimating] = useState(false);

  useEffect(() => {
    if (thumbAnimating && thumbSize < 130) {
      const interval = setInterval(() => {
        setThumbSize(prev => (prev >= 50 ? prev + 2 : prev + 1));
      }, 30);
      return () => clearInterval(interval);
    }
    if (thumbSize >= 130) {
      setThumbAnimating(false);
      setThumbSize(20);
    }
  }, [thumbAnimating, thumbSize]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentText.trim() !== '') {
      setMessages(prev => [...prev, { type: 'sent', text: currentText }]);
      setCurrentText('');
      scrollToBottom();
    }
  };

  const handleThumbClick = () => {
    setMessages(prev => [...prev, { type: 'sent', text: '', thumb: true }]);
    setThumbAnimating(true);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }, 100);
  };

  return (
    <div className="screen">
      <div className="conversation" ref={conversationRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`messages messages--${msg.type}`}>
            <div className={`message ${msg.thumb ? 'message--thumb' : ''}`} style={msg.thumb ? { width: thumbSize, height: thumbSize } : {}}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="text-bar">
        <form className="text-bar__field" id="form-message" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type or thumb up ;)"
            value={currentText}
            onChange={(e) => setCurrentText(e.target.value)}
          />
        </form>
        <div className="text-bar__thumb" onMouseDown={handleThumbClick} onMouseUp={() => setThumbAnimating(false)}>
          <div className="thumb" ref={thumbRef}></div>
        </div>
      </div>
    </div>
  );
};

export default  Message_btn;
