interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({ message = "No movies found" }: EmptyStateProps) {
  return (
    <div className="text-center py-5">
      <h3 className="text-white">{message}</h3>
      <p className="text-white">Please try a different search term</p>
    </div>
  );
}
