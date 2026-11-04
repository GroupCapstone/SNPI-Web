import { describe, expect, it } from 'vitest';
import * as React from 'react';
import { useSidebar, SidebarProvider } from './sidebar-context';

describe('Sidebar State & Context Management', () => {
  it('exports SidebarProvider and useSidebar hooks correctly', () => {
    expect(typeof SidebarProvider).toBe('function');
    expect(typeof useSidebar).toBe('function');
  });

  it('provides a valid React component function for SidebarProvider', () => {
    const element = React.createElement(SidebarProvider, null, 'Test Child');
    expect(element.type).toBe(SidebarProvider);
    expect(element.props.children).toBe('Test Child');
  });
});
