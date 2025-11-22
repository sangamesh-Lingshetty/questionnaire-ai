export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          GetQuest Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Upload your documents and questionnaires here
        </p>

        {/* We'll add upload functionality later */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Document upload coming soon...</p>
        </div>
      </div>
    </div>
  );
}
