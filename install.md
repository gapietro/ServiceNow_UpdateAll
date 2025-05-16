# Installation Guide for ServiceNow UpdateAll Package

## Prerequisites
- ServiceNow instance with admin access
- ServiceNow CLI with Fluent extension installed
- Node.js and npm

## Installation Steps

### 1. Clone or Download the Package
```bash
git clone <repository-url>
cd servicenow-updateall
```

### 2. Configure Your ServiceNow Instance
```bash
sn configure profile
```
Follow the prompts to configure your ServiceNow instance connection.

### 3. Deploy the Package
```bash
npm run deploy
```
This will deploy:
- The UpdateAll script to your instance
- The scheduled job (configured to run weekly on Saturday at midnight)
- System properties configured with appropriate values:
  - `plugin.update.batch.size` = 600
  - `plugin.update.skip.list` = ""
- Documentation
- Required roles and access controls

### 4. Verify Installation
1. Check that the script is available in System Definition > Scripts - Background
2. Verify the scheduled job exists in System Definition > Scheduled Jobs
3. Confirm the system properties are set in System Properties > System Properties
4. Verify the custom application "Plugin Update All" is installed in System Applications > Applications

### 5. Permissions Setup
The package creates a custom role `x_snc_updateall.admin` with elevated privileges. To ensure proper functioning:

1. Assign this role to any users who need to manually execute the update script
2. Verify the scheduled job is configured to run as the "system" user
3. Check that ACLs were properly created to allow access to the `sys_store_app` table

For enhanced security:
- Consider using a dedicated service account instead of system
- Review and adjust the ACLs if your instance has stricter security requirements

### 6. Testing
You can manually run the script to test it:
1. Navigate to System Definition > Scripts - Background
2. Open the UpdateAll script
3. Click "Run script"

Alternatively, use the UI action:
1. Navigate to System Applications > Applications
2. Find a plugin with an available update
3. Click "Run Update All Now" from the UI actions

## Post-Installation Configuration
- Adjust the `plugin.update.skip.list` property if you need to exclude specific plugins
- You may want to adjust the `plugin.update.batch.size` based on your instance's performance

## Troubleshooting
- Check system logs for any errors during installation
- Ensure the scheduled job is active
- Verify the user context has sufficient permissions to install plugins
- If you encounter "Access Denied" errors:
  - Verify the `x_snc_updateall.admin` role is properly assigned
  - Check if your instance has any security constraints blocking cross-scope access
  - You may need to request additional elevated privileges from your ServiceNow administrator 