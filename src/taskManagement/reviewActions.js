import { UPDATE } from "react-admin";

export const REVIEW_APPROVE = "REVIEW_APPROVE";
export const REVIEW_APPROVE_LOADING = "REVIEW_APPROVE_LOADING";
export const REVIEW_APPROVE_FAILURE = "REVIEW_APPROVE_FAILURE";
export const REVIEW_APPROVE_SUCCESS = "REVIEW_APPROVE_SUCCESS";

export const reviewApprove = (id, data, basePath) => ({
  type: REVIEW_APPROVE,
  payload: { id, data: { ...data, status: "accepted" }, basePath },
  meta: {
    resource: "taskInboxes",
    fetch: UPDATE,
    onSuccess: {
      notification: {
        body: "resources.taskInboxes.notification.approved_success",
        level: "info"
      },
      redirectTo: "/taskInboxes",
      basePath
    },
    onFailure: {
      notification: {
        body: "resources.taskInboxes.notification.approved_error",
        level: "warning"
      }
    }
  }
});

export const REVIEW_REJECT = "REVIEW_REJECT";
export const REVIEW_REJECT_LOADING = "REVIEW_REJECT_LOADING";
export const REVIEW_REJECT_FAILURE = "REVIEW_REJECT_FAILURE";
export const REVIEW_REJECT_SUCCESS = "REVIEW_REJECT_SUCCESS";

export const reviewReject = (id, data, basePath) => ({
  type: REVIEW_REJECT,
  payload: { id, data: { ...data, status: "rejected" }, basePath },
  meta: {
    resource: "taskInboxes",
    fetch: UPDATE,
    onSuccess: {
      notification: {
        body: "resources.taskInboxes.notification.rejected_success",
        level: "info"
      },
      redirectTo: "/taskInboxes",
      basePath
    },
    onFailure: {
      notification: {
        body: "resources.taskInboxes.notification.rejected_error",
        level: "warning"
      }
    }
  }
});
