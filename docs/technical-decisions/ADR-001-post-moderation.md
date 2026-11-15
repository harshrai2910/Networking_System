# ADR-001-post-moderation

- status: pending
- Date: 4-11-2026
- project: connectsd developement

## 1. Context

Connectsd allows student to share posts containing image and text. To prevent inappropriate content, an AI based moderation system using the gemini API was integrated.

**Initial process of creating post:**

- User sends an API request to backend server.
- Controller executes **3 tasks** at a time:

1. send image to gemini for moderation
2. Upload it to Cloudinary.
3. Save it in database.

Since, this all was a synchronous process so it increased the post creation response time and the user had to wait for AI moderation and image uploading to finish.

## 2. Problem

The whole synchronous process was taking a time of 10-20s in some test cases, while Cloudinary image uploading take approx 2-3s and database operation takes max 1s.

**This Causes:**

- High response time.
- Users must wait for AI moderation

## 3. Approach

I decided to implement Asynchronous moderation system.

**The new workflow is:**

- Directly upload the image to Cloudinary.
- Save the status in MongoDB with a status: "pending".
- Return "Pending" state to frontend which only display the image to the user's post section, **Not in Feed**
- perform AI moderation in background.
- If approved, update the post status to "Approved".
- If rejected, delete the uploaded image from Cloudinary and from the database then update the post status to rejected.

## 4. Consequences

**Positive:**

- Reduced initial API response time.
- Improved user experience.
- AI moderation no longer blocks the initial HTTP response.

**Negative:**

- Additional complexity in managing post statuses.
- Background processing failures need recovery mechanisms.

## 5. Future Improvements

- Implement BullMQ with Redis for reliable background jobs.
- Add automatic retries for failed moderation requests.
- Use Socket.IO to notify users when moderation is complete.
- Implement recovery for posts stuck in the pending state.
