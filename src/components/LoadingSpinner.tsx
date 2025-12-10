export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-8 border-4 border-blue-800 border-t-blue-900 rounded-full animate-spin" />
      <span className="ml-3 text-sm text-blue-600">
        Carregando...
      </span>
    </div>
  );
}