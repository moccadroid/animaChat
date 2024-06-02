import React from 'react';

interface AugmentedTextProps {
  text?: string;
  replaceUrl?: boolean;
  children?: string;
}

const AugmentedText: React.FC<AugmentedTextProps> = ({ text, replaceUrl = true, children }) => {
  const inputText = text || children || '';

  const augmentText = (text: string) => {
    let augmentedText = text;

    if (replaceUrl) {
      const urlRegex = /(\bhttps?:\/\/[^\s]+)/g;
      augmentedText = augmentedText.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
    }

    return augmentedText;
  };

  const augmentedContent = augmentText(inputText);

  return <div dangerouslySetInnerHTML={{ __html: augmentedContent }} />;
};

export default AugmentedText;
