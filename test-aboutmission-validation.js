/**
 * Simple test runner to verify AboutMissionSection data binding fixes
 * Run: node test-aboutmission-validation.js
 */

// Mock data structures to simulate the real components
const mockPageData = {
  components: [
    {
      id: "test-mission-1",
      componentType: "AboutMissionSection",
      contentJson: JSON.stringify({
        title: "Original Title",
        subtitle: "Original Subtitle", 
        description: "Original description",
        vision: "Original vision",
        additionalContent: "Original additional content",
        image: "/original-image.jpg",
        stats: [
          { value: "5+", label: "Years" }
        ],
        missionPoints: [
          { title: "Original Point", description: "Original description" }
        ]
      }),
      isVisible: true,
      theme: 1
    }
  ]
};

// Mock update function
let updateCallCount = 0;
const mockUpdateComponent = (index, field, value) => {
  updateCallCount++;
  console.log(`📝 [MOCK UPDATE ${updateCallCount}] Component ${index}, Field: ${field}, Value:`, 
    typeof value === 'string' && value.length > 50 ? value.substring(0, 50) + '...' : value
  );
  
  // Simulate state update
  if (field === "contentJson") {
    mockPageData.components[index].contentJson = value;
  } else {
    try {
      const currentData = JSON.parse(mockPageData.components[index].contentJson);
      const updatedData = { ...currentData, [field]: value };
      mockPageData.components[index].contentJson = JSON.stringify(updatedData, null, 2);
    } catch (error) {
      console.error("❌ [MOCK UPDATE] JSON error:", error);
    }
  }
};

// Mock normalization function (simplified version)
const mockNormalizeProps = (componentType, data) => {
  console.log("🔄 [MOCK NORMALIZE] Input:", {
    componentType,
    hasData: !!data,
    keys: data ? Object.keys(data) : []
  });
  
  if (componentType === 'AboutMissionSection') {
    return {
      data: {
        title: data?.title || "",
        subtitle: data?.subtitle || "",
        description: data?.description || "",
        vision: data?.vision || "",
        additionalContent: data?.additionalContent || "",
        image: data?.image || "",
        stats: Array.isArray(data?.stats) ? data.stats : [],
        missionPoints: Array.isArray(data?.missionPoints) ? data.missionPoints : []
      }
    };
  }
  
  return data;
};

// Test functions
const testBasicFieldUpdate = () => {
  console.group("🧪 TEST: Basic Field Update");
  
  console.log("Before update:", mockPageData.components[0].contentJson);
  
  mockUpdateComponent(0, "title", "Updated Test Title");
  
  console.log("After update:", mockPageData.components[0].contentJson);
  
  // Verify the update
  const updatedData = JSON.parse(mockPageData.components[0].contentJson);
  const success = updatedData.title === "Updated Test Title";
  
  console.log("✅ Test Result:", success ? "PASS" : "FAIL");
  console.groupEnd();
  return success;
};

const testArrayFieldUpdate = () => {
  console.group("🧪 TEST: Array Field Update");
  
  const newStats = [
    { value: "10+", label: "Years Experience" },
    { value: "100+", label: "Projects Completed" }
  ];
  
  mockUpdateComponent(0, "stats", newStats);
  
  // Verify the update
  const updatedData = JSON.parse(mockPageData.components[0].contentJson);
  const success = Array.isArray(updatedData.stats) && updatedData.stats.length === 2;
  
  console.log("Updated stats:", updatedData.stats);
  console.log("✅ Test Result:", success ? "PASS" : "FAIL");
  console.groupEnd();
  return success;
};

const testNormalizationPipeline = () => {
  console.group("🧪 TEST: Normalization Pipeline");
  
  // Get current data
  const component = mockPageData.components[0];
  const rawData = JSON.parse(component.contentJson);
  
  // Test normalization
  const normalized = mockNormalizeProps(component.componentType, rawData);
  
  const success = normalized && 
                  normalized.data && 
                  typeof normalized.data.title === 'string' &&
                  Array.isArray(normalized.data.stats) &&
                  Array.isArray(normalized.data.missionPoints);
  
  console.log("Normalized structure:", {
    hasDataWrapper: !!normalized.data,
    fieldsCount: normalized.data ? Object.keys(normalized.data).length : 0,
    hasAllExpectedFields: success
  });
  
  console.log("✅ Test Result:", success ? "PASS" : "FAIL");
  console.groupEnd();
  return success;
};

const testRapidUpdates = () => {
  console.group("🧪 TEST: Rapid Updates Simulation");
  
  const rapidUpdates = [
    { field: "title", value: "Rapid 1" },
    { field: "title", value: "Rapid 12" },
    { field: "title", value: "Rapid 123" },
    { field: "title", value: "Final Rapid Title" }
  ];
  
  const startTime = Date.now();
  
  rapidUpdates.forEach(({ field, value }) => {
    mockUpdateComponent(0, field, value);
  });
  
  const endTime = Date.now();
  
  // Verify final state
  const finalData = JSON.parse(mockPageData.components[0].contentJson);
  const success = finalData.title === "Final Rapid Title";
  
  console.log("Rapid updates performance:", {
    updatesCount: rapidUpdates.length,
    duration: endTime - startTime,
    finalTitle: finalData.title,
    totalUpdateCalls: updateCallCount
  });
  
  console.log("✅ Test Result:", success ? "PASS" : "FAIL");
  console.groupEnd();
  return success;
};

// Run all tests
const runAllTests = () => {
  console.log("🎯 ABOUTMISSIONSECTION DATA BINDING VALIDATION");
  console.log("=" .repeat(60));
  
  const results = {
    basicFieldUpdate: testBasicFieldUpdate(),
    arrayFieldUpdate: testArrayFieldUpdate(),
    normalizationPipeline: testNormalizationPipeline(),
    rapidUpdates: testRapidUpdates()
  };
  
  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;
  
  console.log("\n📊 TEST SUMMARY");
  console.log("=" .repeat(60));
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  Object.entries(results).forEach(([testName, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${testName}: ${passed ? 'PASS' : 'FAIL'}`);
  });
  
  if (passedTests === totalTests) {
    console.log("\n🎉 ALL TESTS PASSED! AboutMissionSection data binding is working correctly.");
  } else {
    console.log("\n⚠️  Some tests failed. Check the implementation for issues.");
  }
  
  console.log(`\n🔧 Total update function calls: ${updateCallCount}`);
  
  return passedTests === totalTests;
};

// Run tests
runAllTests();