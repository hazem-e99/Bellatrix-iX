import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  Bars3BottomLeftIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Button from "../../UI/Button";
import Card, { CardContent, CardHeader, CardTitle } from "../../UI/Card";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const PageBuilder = ({ category, sections, onSectionsUpdate }) => {
  const [availableComponents, setAvailableComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchAvailableComponents();
  }, [category]);

  const fetchAvailableComponents = async () => {
    try {
      setLoading(true);
      setError(null);

      // Define available components based on category
      const componentLibrary = {
        services: [
          {
            id: "hero-section",
            name: "Hero Section",
            description: "Main banner with title and call-to-action",
            icon: "🎯",
            componentId: "HeroSection",
            category: "layout",
            preview: "/images/HeroSection.png",
          },
          {
            id: "service-grid",
            name: "Service Grid",
            description: "Grid layout for service offerings",
            icon: "⚙️",
            componentId: "ServiceGrid",
            category: "content",
            preview: "/images/ourProServices.png",
          },
          {
            id: "testimonials",
            name: "Testimonials",
            description: "Customer testimonials and reviews",
            icon: "💬",
            componentId: "Testimonials",
            category: "social",
            preview: "/images/about.jpg",
          },
          {
            id: "contact-form",
            name: "Contact Form",
            description: "Contact form for inquiries",
            icon: "📝",
            componentId: "ContactForm",
            category: "form",
            preview: "/images/about.jpg",
          },
        ],
        solutions: [
          {
            id: "solution-hero",
            name: "Solution Hero",
            description: "Hero section for solution pages",
            icon: "🚀",
            componentId: "SolutionHero",
            category: "layout",
            preview: "/images/solution.jpg",
          },
          {
            id: "feature-list",
            name: "Feature List",
            description: "List of key features and benefits",
            icon: "✅",
            componentId: "FeatureList",
            category: "content",
            preview: "/images/solution.jpg",
          },
          {
            id: "pricing-table",
            name: "Pricing Table",
            description: "Pricing comparison table",
            icon: "💰",
            componentId: "PricingTable",
            category: "commerce",
            preview: "/images/solution.jpg",
          },
        ],
        industries: [
          {
            id: "industry-hero",
            name: "Industry Hero",
            description: "Industry-specific hero section",
            icon: "🏭",
            componentId: "IndustryHero",
            category: "layout",
            preview: "/images/indleaders.jpg",
          },
          {
            id: "case-studies",
            name: "Case Studies",
            description: "Industry case studies and success stories",
            icon: "📊",
            componentId: "CaseStudies",
            category: "content",
            preview: "/images/indleaders.jpg",
          },
          {
            id: "industry-stats",
            name: "Industry Statistics",
            description: "Key industry statistics and metrics",
            icon: "📈",
            componentId: "IndustryStats",
            category: "data",
            preview: "/images/indleaders.jpg",
          },
        ],
        about: [
          {
            id: "about-hero",
            name: "About Hero",
            description: "Company introduction hero section",
            icon: "🏢",
            componentId: "AboutHero",
            category: "layout",
            preview: "/images/about.jpg",
          },
          {
            id: "team-grid",
            name: "Team Grid",
            description: "Team member showcase grid",
            icon: "👥",
            componentId: "TeamGrid",
            category: "content",
            preview: "/images/about.jpg",
          },
          {
            id: "company-timeline",
            name: "Company Timeline",
            description: "Company history and milestones",
            icon: "📅",
            componentId: "CompanyTimeline",
            category: "content",
            preview: "/images/about.jpg",
          },
          {
            id: "values-section",
            name: "Values Section",
            description: "Company values and mission",
            icon: "💎",
            componentId: "ValuesSection",
            category: "content",
            preview: "/images/about.jpg",
          },
        ],
      };

      const components = componentLibrary[category?.id] || componentLibrary.services;
      setAvailableComponents(components);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addSection = (component) => {
    const newSection = {
      uid: `section-${Date.now()}`,
      name: component.name,
      componentId: component.componentId,
      icon: component.icon,
      category: component.category,
      order_index: sections.length,
      data: {
        title: component.name,
        content: `This is a ${component.name.toLowerCase()} section.`,
        ...getDefaultDataForComponent(component.componentId),
      },
    };

    onSectionsUpdate([...sections, newSection]);
  };

  const getDefaultDataForComponent = (componentId) => {
    const defaultData = {
      HeroSection: {
        title: "Welcome to Our Services",
        subtitle: "Professional solutions for your business",
        buttonText: "Get Started",
        backgroundImage: "/images/HeroSection.png",
      },
      ServiceGrid: {
        title: "Our Services",
        services: [
          { name: "Service 1", description: "Description for service 1" },
          { name: "Service 2", description: "Description for service 2" },
        ],
      },
      Testimonials: {
        title: "What Our Clients Say",
        testimonials: [
          { name: "Client 1", quote: "Great service!", company: "Company 1" },
        ],
      },
      ContactForm: {
        title: "Get In Touch",
        fields: ["name", "email", "message"],
      },
    };

    return defaultData[componentId] || {};
  };

  const duplicateSection = (sectionUid) => {
    const sectionToDuplicate = sections.find(section => section.uid === sectionUid);
    if (sectionToDuplicate) {
      const newSection = {
        ...sectionToDuplicate,
        uid: `section-${Date.now()}`,
        order_index: sections.length,
      };
      onSectionsUpdate([...sections, newSection]);
    }
  };

  const removeSection = (sectionUid) => {
    const updatedSections = sections.filter(section => section.uid !== sectionUid);
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order_index: index,
    }));
    onSectionsUpdate(reorderedSections);
  };

  const moveSection = (fromIndex, toIndex) => {
    const sectionsArray = [...sections];
    const [movedSection] = sectionsArray.splice(fromIndex, 1);
    sectionsArray.splice(toIndex, 0, movedSection);
    
    const reorderedSections = sectionsArray.map((section, index) => ({
      ...section,
      order_index: index,
    }));
    
    onSectionsUpdate(reorderedSections);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.uid === active.id);
      const newIndex = sections.findIndex(section => section.uid === over.id);

      const reorderedSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({
        ...section,
        order_index: index,
      }));

      onSectionsUpdate(reorderedSections);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <ArrowPathIcon className="h-5 w-5 animate-spin text-blue-500" />
          <span className="text-gray-600 dark:text-gray-400">
            Loading components...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Error Loading Components
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Button onClick={fetchAvailableComponents} variant="outline">
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Build Your Page
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Drag and drop components to build your {category?.name?.toLowerCase() || "page"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Components */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              Available Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableComponents.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => addSection(component)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{component.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {component.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {component.description}
                        </p>
                      </div>
                      <PlusIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Sections */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Page Sections ({sections.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sections.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No sections added yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Click on components from the left to start building your page
                  </p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={sections.map(section => section.uid)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {sections.map((section, index) => (
                        <SortableSectionItem
                          key={section.uid}
                          section={section}
                          index={index}
                          onDuplicate={() => duplicateSection(section.uid)}
                          onRemove={() => removeSection(section.uid)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                  <DragOverlay>
                    {activeId ? (
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg">
                            {sections.find(s => s.uid === activeId)?.icon || "📄"}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                              {sections.find(s => s.uid === activeId)?.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Sortable Section Item Component
const SortableSectionItem = ({ section, index, onDuplicate, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 ${
        isDragging ? "shadow-lg ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
          >
            <Bars3BottomLeftIcon className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-xl">{section.icon}</div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              {section.name}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {section.componentId}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="outline"
            onClick={onDuplicate}
            className="hover:bg-green-50 hover:border-green-300"
          >
            <DocumentDuplicateIcon className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onRemove}
            className="hover:bg-red-50 hover:border-red-300 text-red-600"
          >
            <TrashIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PageBuilder;
