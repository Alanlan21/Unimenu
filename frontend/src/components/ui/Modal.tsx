import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 w-full max-w-md bg-[#F2E2C4] rounded-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-primary-light">
          <h2 className="text-lg font-semibold text-primary-dark">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 text-primary hover:text-primary-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}