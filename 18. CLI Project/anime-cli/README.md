# Anime Watchlist CLI

A command-line tool to search for anime, manage your watchlist, and refresh anime data using the Jikan API.

---

## 🚀 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/anime-watchlist-cli.git
   cd anime-watchlist-cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

---

## 📌 Usage

Run commands using `node index.js` with one of the supported flags:
```bash
node index.js [name <anime> | genres <genre1/genre2> | season | watchlist | refresh | help]
```

### 🔧 Commands

| Command | Description |
|---------|-------------|
| `name <anime-name>` | Search for anime by title (e.g., `node index.js --name "Attack on Titan"`). |
| `genres <genre1/genre2>` | Search by up to 2 genres (e.g., `node index.js --genres "Action/Drama"`). |
| `genres` | List all available genres. |
| `season` | Display the current anime season, ranked by score. |
| `watchlist` | View and manage your watchlist (navigate with `←/→`, delete with `d`). |
| `refresh` | Refresh watchlist data from the Jikan API. |
| `help` | Show usage instructions and examples. |

---

## 🛠️ Examples

- **Search by name:**
  ```bash
  node index.js name Frieren
  ```
- **Search by genres:**
  ```bash
  node index.js genres Psychological/Horror
  ```
- **List all genres:**
  ```bash
  node index.js genres
  ```
- **View current season:**
  ```bash
  node index.js season
  ```
- **Open watchlist:**
  ```bash
  node index.js watchlist
  ```
- **Refresh watchlist data:**
  ```bash
  node index.js refresh
  ```
- **Show help:**
  ```bash
  node index.js help
  ```

---

## 🌟 Key Features

### 🔎 Search Results
- View **9 results per page**, navigate with `←/→`.
- Press `1-9` to see details for listed anime.
- Add anime to your watchlist with `y/n` prompts.

### 📌 Watchlist
- Open directly to anime details with `watchlist`.
- Navigate entries with `←/→`.
- Delete entries with `d` (confirmation required).

### ⚠️ Error Handling
- Graceful handling of **network errors, invalid genres, and empty results**.
- User-friendly messages for **rate limits (HTTP 420), missing data, and malformed files**.

---

## 📜 License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
