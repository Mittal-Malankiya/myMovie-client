export const BookCard = ({ book, onBookClick }) => {
  //  const { bookData } = props;
  return (
    <div
      onClick={() => {
        onBookClick(book);
      }}
    >
      {book.title}
    </div>
  );
};
