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
    icon: 'cil-dollar',
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
        name: 'Business Unit Levels',
        url: '/business-unit-levels',
        icon: 'cil-chevron-right',
      },
      {
        name: 'Business Units',
        url: '/business-units',
        icon: 'cil-chevron-right',
      },{
        name: 'Categories',
        url: '/categories',
        icon: 'cil-chevron-right',
      },{
        name: 'Sub-categories',
        url: '/sub-categories',
        icon: 'cil-chevron-right',
      },{
        name: 'Cost Centres',
        url: '/cost-centres',
        icon: 'cil-chevron-right',
      },{
        name: 'Projects',
        url: '/projects',
        icon: 'cil-chevron-right',
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
    name: 'System Settings',
    url: '/system-admin',
    icon: 'cil-applications-settings',
    children: [
      {
        name: 'Contract Settings',
        url: '/contract-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Contractor Role Types',
            url: '/contractor-role-types',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Contract Status',
            url: '/contract-status',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Contract Types',
            url: '/contract-types',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Contractor Types',
            url: '/contractor-types',
            icon: 'cil-chevron-right',
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
            icon: 'cil-chevron-right',
          },
          {
            name: 'Cost Centres',
            url: '/cost-centres',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Prequalification',
            url: '/prequalifications',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Risk Classifications',
            url: '/risk-classifications',
            icon: 'cil-chevron-right',
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
            icon: 'cil-chevron-right',
          },
        ],
      },
      {
        name: 'Process Settings',
        url: '/process-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Complexity',
            url: '/complexities',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Frameworks',
            url: '/procurement-frameworks',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Process Statuses',
            url: '/process-statuses',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Process Types',
            url: '/process-types',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Strategies',
            url: '/procurement-strategies',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Methodologies',
            url: '/procurement-methods',
            icon: 'cil-chevron-right',
          },
        ],
      },
      {
        name: 'Products Settings',
        url: '/process-settings',
        icon: 'icon-settings',
        children: [
          {
            name: 'Product Groups',
            url: '/product-groups',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Product Type',
            url: '/product-types',
            icon: 'cil-chevron-right',
          },
          {
            name: 'Units of Measure',
            url: '/unit-of-measure',
            icon: 'cil-chevron-right',
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
            icon: 'cil-chevron-right',
          },
        ],
      },
    ],
  },

  {
    title: true,
    name: 'Monitoring',
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
        name: 'User Access',
        url: '/user-access',
        icon: 'cil-lock-unlocked',
      },
      {
        name: 'User Teams',
        url: '/teams',
        icon: 'cil-lock-unlocked',
      },
    ],
  },
];
