import { DocumentTextIcon, CheckCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Card, { CardContent } from "../../UI/Card";

const PagesStats = ({ pages }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const publishedCount = pages.filter((p) => p.isPublished).length;
  const lastCreated = pages.length > 0
    ? formatDate(Math.max(...pages.map((p) => new Date(p.createdAt || 0))))
    : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white/10 border border-white/20 shadow transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
              <DocumentTextIcon className="h-6 w-6 text-white/90" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total Pages</p>
              <p className="text-2xl font-bold text-white">{pages.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border border-white/20 shadow transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-white/90" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Published</p>
              <p className="text-2xl font-bold text-white">{publishedCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 border border-white/20 shadow transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-white/10 border border-white/20 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-white/90" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Last Created</p>
              <p className="text-sm font-bold text-white">{lastCreated}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagesStats;

