function textFromBlock(block) {
  if (!block) return '';
  if (Array.isArray(block.children)) {
    return block.children.map((child) => child.text || '').join(' ');
  }
  return block.text || '';
}

export function blocksToPlainText(blocks) {
  if (!Array.isArray(blocks)) return '';
  return blocks.map((block) => textFromBlock(block)).join(' ').trim();
}

export function renderRichText(blocks) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    const type = block.type || 'paragraph';

    if (type === 'heading') {
      const level = Math.min(Math.max(block.level || 2, 2), 4);
      const HeadingTag = `h${level}`;
      return (
        <HeadingTag
          key={index}
          className="font-semibold text-lg md:text-xl text-gray-900 dark:text-white mt-4 mb-2"
        >
          {textFromBlock(block)}
        </HeadingTag>
      );
    }

    if (type === 'list') {
      const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
      const items = Array.isArray(block.children) ? block.children : [];
      return (
        <ListTag
          key={index}
          className="list-disc list-inside space-y-1 pl-4 text-gray-700 dark:text-gray-300"
        >
          {items.map((item, liIndex) => (
            <li key={liIndex}>{textFromBlock(item)}</li>
          ))}
        </ListTag>
      );
    }

    return (
      <p key={index} className="text-gray-700 dark:text-gray-300">
        {textFromBlock(block)}
      </p>
    );
  });
}
