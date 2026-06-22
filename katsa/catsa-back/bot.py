import os
from dotenv import load_dotenv
load_dotenv()

import anthropic
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
from telegram import Update
from typing import Final
import create_db

TOKEN: Final = "6019560557:AAEI-4WB7g4BR87kX5yG7F7vvB5Sy3-GVS0"
BOT_USERNAME: Final = "@KatsaBot"

claude = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))


def build_system_prompt() -> str:
    """Fetch live DB data and build a context-rich system prompt for Claude."""
    try:
        projects = create_db.projects_query()
        workers = create_db.workers_query()
        risks = create_db.risks_query()
        project_risks = create_db.project_risk_query()
    except Exception:
        projects, workers, risks, project_risks = [], [], [], []

    projects_text = "\n".join(
        f"- מזהה {p['id']}: {p['name']} | קבלן: {p['contractorName']} | פקח: {p['supervisorName']} "
        f"| מיקום: {p['location']} | סטטוס: {p.get('StatusName', 'לא ידוע')}"
        for p in projects
    ) or "אין פרויקטים"

    workers_text = "\n".join(
        f"- {w['name']} (ת\"ז: {w['id']}) | תפקיד: {w['class']} | מנהל: {'כן' if w['isManager'] else 'לא'}"
        for w in workers
    ) or "אין עובדים"

    risks_text = "\n".join(
        f"- מזהה {r['id']}: {r['name']}"
        for r in risks
    ) or "אין סיכונים"

    project_risks_text = "\n".join(
        f"- סיכון \"{pr['RiskName']}\" בפרויקט {pr['projectId']} | סטטוס: {pr['status']}"
        for pr in project_risks
        if pr.get('inactive') == 1
    ) or "אין סיכוני פרויקט פעילים"

    return f"""אתה עוזר חכם של מערכת ניהול פרויקטי בנייה בשם "קצא".
ענה תמיד בעברית, בצורה ידידותית ומקצועית.

להלן המידע הנוכחי במערכת:

=== פרויקטים ===
{projects_text}

=== עובדים ===
{workers_text}

=== סיכונים ===
{risks_text}

=== סיכוני פרויקטים פעילים ===
{project_risks_text}

תוכל לענות על שאלות לגבי פרויקטים, עובדים, סיכונים, ולסכם מצב המערכת.
אם שאלה אינה קשורה למערכת, ענה בנימוס שאתה מתמחה בניהול פרויקטי בנייה."""


async def ask_claude(user_message: str) -> str:
    """Send the user message to Claude with project context and return the reply."""
    try:
        system_prompt = build_system_prompt()
        response = claude.messages.create(
            model="claude-opus-4-8",
            max_tokens=1024,
            system=system_prompt,
            messages=[{"role": "user", "content": user_message}],
        )
        return response.content[0].text
    except Exception as e:
        return f"שגיאה בחיבור ל-AI: {e}"


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "שלום! אני הבוט של מערכת קצא 👷\n"
        "אני יכול לענות על שאלות לגבי פרויקטים, עובדים וסיכונים.\n\n"
        "פקודות זמינות:\n"
        "/projects – רשימת פרויקטים\n"
        "/help – עזרה\n\n"
        "או פשוט כתוב לי שאלה בחופשיות!"
    )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "📋 *מה אני יכול לעשות?*\n\n"
        "• /projects – הצג את כל הפרויקטים\n"
        "• שאל אותי על פרויקט ספציפי\n"
        "• שאל על עובדים, סיכונים, סטטוסים\n"
        "• קבל סיכום כללי של המערכת\n\n"
        "לדוגמה: _\"מה הסיכונים בפרויקט 3?\"_ או _\"כמה פרויקטים פעילים יש?\"_",
        parse_mode="Markdown"
    )


async def projects_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        projects = create_db.projects_query()
        if not projects:
            await update.message.reply_text("אין פרויקטים במערכת.")
            return
        message = "📁 *רשימת פרויקטים:*\n\n"
        for p in projects:
            message += f"🔹 *{p['name']}* (מזהה: {p['id']})\n"
            message += f"   פקח: {p['supervisorName']} | סטטוס: {p.get('StatusName', '—')}\n\n"
        await update.message.reply_text(message, parse_mode="Markdown")
    except Exception as e:
        await update.message.reply_text(f"שגיאה בטעינת פרויקטים: {e}")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    message_type: str = update.message.chat.type
    text: str = update.message.text

    if message_type == 'group':
        if BOT_USERNAME not in text:
            return
        text = text.replace(BOT_USERNAME, '').strip()

    await update.message.chat.send_action("typing")
    response = await ask_claude(text)
    await update.message.reply_text(response)


if __name__ == '__main__':
    app = Application.builder().token(TOKEN).build()

    app.add_handler(CommandHandler('start', start_command))
    app.add_handler(CommandHandler('help', help_command))
    app.add_handler(CommandHandler('projects', projects_command))
    app.add_handler(MessageHandler(filters.TEXT, handle_message))

    print("Bot is running...")
    app.run_polling(poll_interval=3)
