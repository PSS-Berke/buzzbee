'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

export default function StickyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-gold hover:bg-gold-dark text-white p-4 rounded-full shadow-lg shadow-gold/20 transition-all hover:scale-105 ${
          isOpen ? 'hidden' : 'flex'
        } items-center gap-2`}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-medium">Chat with a Sleep Expert</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-[#faf8f5] rounded-3xl shadow-2xl shadow-gold/10 overflow-hidden border-2 border-gold/20">
          {/* Header */}
          <div className="bg-gradient-to-r from-gold to-gold-dark p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Sleep Expert</h3>
                <p className="text-sm text-white/80">Typically replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Chat body */}
          <div className="p-4 h-64 overflow-y-auto">
            {/* Welcome message */}
            <div className="flex gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">SS</span>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-gold/10 max-w-[80%]">
                <p className="text-gray-700">
                  Hi there! I&apos;m a Sleep6 expert. I can help you find the perfect mattress
                  or answer any questions about our products. How can I help you today?
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center mb-2">Quick questions:</p>
              {[
                'Which mattress is best for back pain?',
                'Tell me about financing options',
                'How do custom sizes work?',
              ].map((question) => (
                <button
                  key={question}
                  className="block w-full text-left bg-white border-2 border-gold/10 rounded-xl p-2 text-sm text-gray-700 hover:border-gold/30 hover:text-gold-dark transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gold/10 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (message.trim()) {
                  // Handle message send
                  setMessage('');
                }
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border-2 border-gold/10 rounded-full focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="p-2 bg-gold text-white rounded-full hover:bg-gold-dark transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-3 text-center">
              <a
                href="tel:18443753376"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gold-dark"
              >
                <Phone className="w-4 h-4" />
                Or call us: 1-844-375-3376
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
