# ServiceNow UpdateAll Script

A scheduled script that automatically updates ServiceNow plugins to their latest versions. This script serves as a "Update All" capability for ServiceNow instances, which is not available out-of-the-box.

## Purpose

This script is designed to:
- Run as a scheduled job (typically weekly on weekends)
- Update all available plugins to their latest versions
- Skip specified plugins when needed
- Handle large volumes of updates safely
- Provide detailed logging for monitoring

## How It Works

The script:
1. Identifies all plugins with updates available
2. Filters out any plugins in the skip list
3. Processes updates in configurable batches to prevent timeouts
4. Logs detailed information about the update process

## Configuration

### System Properties

| Property Name | Description | Default | Example |
|---------------|-------------|---------|---------|
| `plugin.update.skip.list` | Comma-separated list of plugins to skip (by source ID or sys_id) | Empty | `com.glide.cicd,com.snc.sdlc` |
| `plugin.update.batch.size` | Maximum number of plugins to update in a single run | 10 | `25` |

### Skip List Configuration

The skip list allows you to exclude specific plugins from automatic updates. You can specify either:
- The plugin's source identifier (e.g., `com.glide.cicd`)
- The plugin's sys_id

Example skip list: `com.glide.cicd,com.snc.sdlc,2ab3d5c137312300f063dcf03990e992`

### Batch Size Configuration

The batch size controls how many plugins are updated in a single execution. This is critical for:
- Preventing transaction timeouts
- Managing system resource usage
- Enabling incremental updates of large numbers of plugins

For environments with 600+ plugins to update:
- A lower batch size (10-25) is safer but requires more scheduled runs
- A higher batch size (50-100) completes faster but may risk timeouts
- Adjust based on your instance's performance characteristics

## Deployment Instructions

### Using ServiceNow SDK

This package can be deployed using the ServiceNow SDK. Follow these steps:

#### Prerequisites
- Node.js (v18.16.1 or later recommended)
- ServiceNow SDK installed: `npm install -g @servicenow/sdk`
- Access to a ServiceNow instance with admin privileges

#### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd servicenow-updateall
   ```

2. **Initialize the project structure** (if now.config.json is not present)
   ```bash
   now-sdk init
   ```
   Follow the prompts to:
   - Enter your application name (ServiceNow UpdateAll Package)
   - Select the application scope (x_snc_updateall)
   - Choose other options as needed

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Authenticate with your ServiceNow instance**
   ```bash
   now-sdk auth --add https://yourinstance.service-now.com --type oauth
   ```
   Follow the prompts to:
   - Complete the authentication flow in your browser
   - Copy and paste the authentication token when prompted

5. **Build the application**
   ```bash
   now-sdk build
   ```
   This generates the installation artifacts required for deployment.

6. **Deploy the application**
   ```bash
   now-sdk install --url="https://yourinstance.service-now.com"
   ```
   or use the alias:
   ```bash
   now-sdk deploy --url="https://yourinstance.service-now.com"
   ```

7. **Verify installation**
   Connect to your instance and verify the application is installed under System Applications > Applications.

### Using Studio

You can also deploy using ServiceNow Studio by:
1. Navigate to System Applications > Studio
2. Click "Import From Source Control"
3. Enter your repository URL and credentials
4. Follow the prompts to complete the import

## Usage

### Scheduled Job Setup

1. Create a new Scheduled Script Execution
2. Set the script field to the contents of `sn_updateall.js`
3. Schedule it to run at your preferred maintenance window (e.g., weekly on weekends)
4. Set an appropriate run-as user with plugin installation permissions

### Manual Execution

The script can also be executed on-demand:
1. Navigate to System Definition > Scripts - Background
2. Create a new script with the contents of `sn_updateall.js`
3. Click "Run script" to execute immediately

## Logging

The script produces detailed logs in the system log, including:
- Script start and end times
- Total number of plugins to update
- Individual plugin update attempts with timing
- Summary of success, skips, and failures
- Detailed error information for troubleshooting

## Troubleshooting

If updates are failing:
- Check system logs for detailed error messages
- Verify the executing user has sufficient permissions
- Ensure prerequisite plugins are installed
- Check for dependency conflicts

If the script times out:
- Reduce the `plugin.update.batch.size` property
- Check for resource-intensive plugins and add them to the skip list
- Consider running during lower system usage periods 