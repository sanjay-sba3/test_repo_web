import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  get openMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutButton(): Locator {
    // UI discovery and SESSION info confirm this has role='button'
    return this.page.getByRole('button', { name: 'Logout' });
  }

  get shoppingCartBadge(): Locator {
    return this.page.locator('.shopping_cart_badge');
  }

  addToCartButton(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' });
  }

  async logout(): Promise<void> {
    await this.click(this.openMenuButton);
    await this.click(this.logoutButton);
  }
}
