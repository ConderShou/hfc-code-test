import { Sequelize } from "sequelize-typescript";
import Content from "./models/Content.model";
import { ContentStatus } from "./enums/ContentStatus.enum";
import User from "./models/User.model";
import express, { Request, Response } from "express";
import cors from "cors";
import { validateContentStatus } from "./validation/validateContentStatus";

const app = express();
const PORT = 4000;

const sequelize = new Sequelize("HFC", "root", "HFC2023", {
  host: "35.239.125.245",
  dialect: "mysql",
});

sequelize.addModels([User, Content]);

// Create table if not exists
sequelize.sync();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

// Get users route
app.get("/users", async (req: Request, res) => {
  const users = await User.findAll();
  res.json(users);
});

// View content for user
app.get(
  "/content/:userId",
  async (
    req: Request<{
      userId: number;
    }>,
    res: Response<{
      userId: number,
      allUserContent: {
        id: number;
        url: string;
        status: string;
        userId: number;
      }[]
    }
    >
  ) => {
    const userId = req.params["userId"];
    const content = await Content.findAll({
      where: {
        status: ContentStatus.PENDING,
        userId: userId,
      }
    });
    res.json({
      userId,
      allUserContent: content
    });
  }
);

// Update content status
// If the status is not valid, return 400 status code
// If the content does not exist, return 404 status code
// If the content is already approved, you can't change the status, return 400 status code
app.put(
  "/content/status",
  async (
    req: Request<null, null, {
      userId: number;
      contentId: number,
      // Ideally: ContentStatus[keyof typeof ContentStatus] but requires a change in the enum/db values
      status: string
    }>,
    res: Response<{
      userId: number,
      content: {
        id: number;
        url: string;
        status: string;
        userId: number;
      }
    } | {
      error: string
    }
    >
  ) => {
    const { userId, contentId, status } = req.body;
    if (!validateContentStatus(status)) {
      return res.status(400).json({ error: `Invalid Status: ${status}`})
    }

    const content = await Content.findOne({
      where: {
        userId: userId,
        id: contentId,
      }
    });
    if (!content) {
      return res.status(404).json({ error: `Content Not Found for ID: ${contentId}`})
    }

    if (content.getDataValue("status") === ContentStatus.APPROVED) {
      return res.status(400).json({ error: `Content ID ${contentId} is already approved`})
    }

    const updatedContent = await content.update({ status });

    res.json({
      userId: updatedContent.getDataValue("userId"),
      content: updatedContent
    });
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
