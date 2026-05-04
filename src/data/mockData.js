/**
 * 🔥 MOCK AUTOMATION ACTIONS (API-LIKE STRUCTURE)
 * Used in:
 * - Automation Node config
 * - Dynamic form generation
 */

export const automationActions = [
  {
    id: "send_email",
    label: "Send Email",
    description: "Send an email to a recipient",
    params: [
      { key: "to", label: "Recipient Email", type: "text", required: true },
      { key: "subject", label: "Subject", type: "text", required: true },
      { key: "body", label: "Email Body", type: "textarea", required: false },
    ],
  },

  {
    id: "generate_doc",
    label: "Generate Document",
    description: "Create a document from template",
    params: [
      { key: "template", label: "Template Name", type: "text", required: true },
      { key: "recipient", label: "Recipient Name", type: "text", required: true },
    ],
  },

  {
    id: "send_notification",
    label: "Send Notification",
    description: "Push notification to system user",
    params: [
      { key: "userId", label: "User ID", type: "text", required: true },
      { key: "message", label: "Message", type: "text", required: true },
    ],
  },
];

/**
 * 🔥 MOCK API SIMULATION (ASYNC)
 * Simulates POST /simulate
 */

export const simulateWorkflowAPI = (workflow) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const steps = workflow.flow?.map((step, index) => ({
        step: index + 1,
        label: step.label,
        status: "completed",
        timestamp: new Date().toISOString(),
      }));

      resolve({
        success: true,
        steps,
      });
    }, 1000); // simulate latency
  });
};