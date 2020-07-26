import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Forward Planning',
    url: '/forward-plans',
    icon: 'icon-cursor',
  },
  {
    name: 'Invitation Processes',
    url: '/invitation-process',
    icon: 'icon-basket-loaded',
  },
  {
    name: 'Contracts',
    url: '/contracts',
    icon: 'icon-note',
  },
  {
    name: 'Purchase Orders',
    url: '/purchase-orders',
    icon: 'icon-note',
  },
  {
    title: true,
    name: 'Core Data',
  },
  {
    name: 'Supplier Data',
    url: '/supplier-data',
    icon: 'cil-factory',
    children: [
      {
        name: 'Suppliers',
        url: '/suppliers',
        icon: 'cil-store',
      },
      {
        name: 'Supplier Contacts',
        url: '/supplier-contacts',
        icon: 'cil-user-female',
      },
    ],
  },
  {
    name: 'Business Data',
    url: '/supplier-data',
    icon: 'cil-factory',
    children: [
      {
        name: 'Projects',
        url: '/projectss',
        icon: 'cil-store',
      },
      {
        name: 'Supplier Contacts',
        url: '/supplier-contacts',
        icon: 'cil-user-female',
      },
    ],
  },
  {
    name: 'People',
    url: '/people-data',
    icon: 'cil-group',
    children: [
      {
        name: 'Person',
        url: '/Person',
        icon: 'cil-user',
      },
    ],
  },
  {
    title: true,
    name: 'Settings',
  },
  {
    name: 'System Admin',
    url: '/system-admin',
    icon: 'icon-settings',
    children: [
      {
        name: 'Contract Settings',
        url: '/contract-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Contract Status',
            url: '/contract-status',
            icon: 'cil-graph',
          },
          {
            name: 'Contract Types',
            url: '/contract-types',
            icon: 'cil-signpost',
          },
          {
            name: 'Contractor Types',
            url: '/contractor-types',
            icon: 'cil-signpost',
          },
          {
            name: 'Contractor Role Types',
            url: '/contractor-role-types',
            icon: 'cil-signpost',
          },
        ],
      },
      {
        name: 'Meta Data Settings',
        url: '/meta-data-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Capabilities',
            url: '/capabilities',
            icon: 'cil-badge',
          },
          {
            name: 'Prequalification',
            url: '/prequalifications',
            icon: 'cil-badge',
          },
          {
            name: 'Cost Centres',
            url: '/cost-centres',
            icon: 'cil-badge',
          },
          {
            name: 'Risk Classifications',
            url: '/risk-classifications',
            icon: 'cil-badge',
          },
        ],
      },
      {
        name: 'People Settings',
        url: '/process-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Role Type',
            url: '/role-types',
            icon: 'cil-graph',
          },
        ],
      },
      {
        name: 'Process Settings',
        url: '/process-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Process Statuses',
            url: '/process-statuses',
            icon: 'cil-graph',
          },
          {
            name: 'Process Types',
            url: '/process-types',
            icon: 'cil-signpost',
          },
          {
            name: 'Frameworks',
            url: '/procurement-frameworks',
            icon: 'cil-signpost',
          },
          {
            name: 'Complexity',
            url: '/complexities',
            icon: 'cil-signpost',
          },
        ],
      },
      {
        name: 'Products Settings',
        url: '/process-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Units of Measure',
            url: '/unit-of-measure',
            icon: 'cil-graph',
          },
        ],
      },
      {
        name: 'System Settings',
        url: '/system-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Contract Status',
            url: '/contract-status',
            icon: 'cil-graph',
          },
        ],
      },
      {
        name: 'System Monitoring',
        url: '/system-settings',
        icon: 'cis-search',
        children: [
          {
            name: 'Audit Trail',
            url: '/audit-trail',
            icon: 'cis-magnifying-glass',
          },
        ],
      },
    ],
  },

  {
    title: true,
    name: 'Users',
  },
  {
    name: 'User Admin',
    url: '/user-admin',
    icon: 'cil-group',
    children: [
      {
        name: 'User Accounts',
        url: '/user-accounts',
        icon: 'cil-user',
      },
      {
        name: 'User Access',
        url: '/user-access',
        icon: 'cil-lock-unlocked',
      },
    ],
  },
];
