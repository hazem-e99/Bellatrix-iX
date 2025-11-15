import { CheckIcon, ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Card, { CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Input } from "../../UI/Input";
import CategorySelector from "./CategorySelector";

const PageDetailsStep = ({
  pageData,
  onDataChange,
  slugChecking,
  slugAvailable,
  slugError,
}) => {
  return (
    <Card className="bg-[var(--color-white)]/5 backdrop-blur-sm border border-[var(--color-white-10)] shadow-xl">
      <CardHeader>
        <CardTitle className="text-[var(--color-text-inverse)] text-xl font-bold">
          Page Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
              Page Name *
            </label>
            <Input
              value={pageData.name}
              onChange={(e) => onDataChange("name", e.target.value)}
              placeholder="Enter page name"
              className="w-full bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-black placeholder-gray-400 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
              URL Slug *
            </label>
            <div className="relative">
              <Input
                type="text"
                value={pageData.slug}
                onChange={(e) => onDataChange("slug", e.target.value)}
                placeholder="page-url-slug"
                pattern="[a-z0-9-]+"
                title="Slug must only contain lowercase letters, numbers, and dashes."
                className={`w-full bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-black placeholder-gray-400 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20 ${
                  slugError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : slugAvailable && pageData.slug
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                    : ""
                }`}
              />
              {slugChecking && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ArrowPathIcon className="h-4 w-4 text-gray-400 animate-spin" />
                </div>
              )}
              {!slugChecking && pageData.slug && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {slugAvailable ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            <p className="text-sm text-[var(--color-ww-100)] mt-2">
              URL: /{pageData.slug || "page-url-slug"}
            </p>
            <p className="text-xs text-[var(--color-text-light)] mt-1">
              Slug must only contain lowercase letters, numbers, and dashes.
            </p>
            {slugError && (
              <p className="text-xs text-red-400 mt-1 flex items-center">
                <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
                {slugError}
              </p>
            )}
            {!slugError && slugAvailable && pageData.slug && (
              <p className="text-xs text-green-400 mt-1 flex items-center">
                <CheckIcon className="h-3 w-3 mr-1" />
                Slug is available
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
              SEO Meta Title
            </label>
            <Input
              value={pageData.metaTitle}
              onChange={(e) => onDataChange("metaTitle", e.target.value)}
              placeholder="SEO title for search engines"
              className="w-full bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-black placeholder-gray-400 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20"
            />
          </div>
          <div></div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
            SEO Meta Description
          </label>
          <textarea
            value={pageData.metaDescription}
            onChange={(e) => onDataChange("metaDescription", e.target.value)}
            placeholder="SEO description for search engines"
            rows={3}
            className="block w-full rounded-lg bg-[var(--color-white-10)] backdrop-blur-sm border-[var(--color-white-20)] text-white placeholder-white/50 focus:border-[var(--color-primary-light)] focus:ring-[var(--color-primary-light)]/20 shadow-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--color-text-inverse)] mb-2">
            Category *
          </label>
          <CategorySelector
            value={pageData.categoryId}
            onChange={(id) => onDataChange("categoryId", id)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={pageData.isHomepage}
              onChange={(e) => onDataChange("isHomepage", e.target.checked)}
              className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-[var(--color-border-secondary)] rounded"
            />
            <span className="ml-2 text-sm text-[var(--color-text-inverse)]">
              Set as Homepage
            </span>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default PageDetailsStep;

