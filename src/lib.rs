mod utils;

use wasm_bindgen::prelude::*;

extern crate js_sys;
use js_sys::Math as JSMath;

extern crate fixedbitset;
use fixedbitset::FixedBitSet;

extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    pub width: u32,
    pub height: u32,
    cells: FixedBitSet,
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Universe {
        utils::set_panic_hook();

        let width = 64;
        let height = 64;

        let cells = Universe::make_random_cells(width, height);

        Universe {
            width,
            height,
            cells,
        }
    }

    pub fn cells(&self) -> *const u32 {
        self.cells.as_slice().as_ptr()
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for column in 0..self.width {
                let index = self.get_index(row, column);
                let cell = self.cells[index];
                let live_neighbors = self.live_neighbor_count(row, column);

                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbors
                    // dies, as if caused by underpopulation.
                    (true, x) if x < 2 => false,
                    // Rule 2: Any live cell with two or three live neighbors
                    // lives on to the next generation.
                    (true, 2) | (true, 3) => true,
                    // Rule 3: Any live cell with more than three live
                    // neighbors dies, as if by overpopulation.
                    (true, x) if x > 3 => false,
                    // Rule 4: Any dead cell with exactly three live neighbors
                    // becomes a live cell, as if by reproduction.
                    (false, 3) => true,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };
                next.set(index, next_cell);
            }
        }

        self.cells = next;
    }

    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let index = self.get_index(row, column);
        self.cells.set(index, !self.cells[index]);
    }

    pub fn randomize_cells(&mut self) {
        self.cells = Universe::make_random_cells(self.width, self.height);
    }

    pub fn kill_all_cells(&mut self) {
        let size = (self.width * self.height) as usize;
        self.cells = Universe::make_dead_cells(size);
    }

    pub fn insert_glider(&mut self, row: u32, column: u32) {
        let corrected_row = {
            if row == 0 {
                row + 1
            } else if row >= (self.height - 1) {
                row - 1
            } else {
                row
            }
        };
        let corrected_column = {
            if column == 0 {
                column + 1
            } else if column >= (self.width - 1) {
                column - 1
            } else {
                column
            }
        };

        for x in 0..3 {
            for y in 0..3 {
                let index = self.get_index((corrected_row + x) - 1, (corrected_column + y) - 1);
                let is_top_edges = x == 0 && y != 0;
                let is_center = x == 1 && y == 1;
                let is_left = x == 1 && y == 0;
                self.cells
                    .set(index, !is_top_edges && !is_center && !is_left)
            }
        }
    }

    pub fn insert_pulsar(&mut self, row: u32, column: u32) {
        let corrected_row = {
            if row == 0 {
                row + 6
            } else if row >= (self.height - 7) {
                let difference = row - (self.height - 7);
                row - difference
            } else {
                row
            }
        };
        let corrected_column = {
            if column == 0 {
                column + 6
            } else if column >= (self.width - 7) {
                let difference = column - (self.width - 7);
                column - difference
            } else {
                column
            }
        };

        for x in 0..3 {
            for y in 0..3 {
                let index = self.get_index((corrected_row + x) - 1, (corrected_column + y) - 1);
                self.cells.set(index, true);
            }
        }
    }

    /// Set the width of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_width(&mut self, width: u32) {
        self.width = width;

        let size = (width * self.height) as usize;

        self.cells = Universe::make_dead_cells(size);
    }

    /// Set the height of the universe.
    ///
    /// Resets all cells to the dead state.
    pub fn set_height(&mut self, height: u32) {
        self.height = height;

        let size = (height * self.width) as usize;

        self.cells = Universe::make_dead_cells(size);
    }
}

impl Universe {
    /// Get the dead and alive values of the entire universe.
    pub fn get_cells(&self) -> Vec<Cell> {
        let mut cells = Vec::new();
        for index in 0..self.cells.len() {
            if self.cells[index] {
                cells.push(Cell::Alive)
            } else {
                cells.push(Cell::Dead)
            }
        }
        cells
    }

    /// Set cells to be alive in a universe by passing the row and column
    /// of each cell as an array.
    pub fn set_cells(&mut self, cells: &[(u32, u32)]) {
        for (row, column) in cells.iter().cloned() {
            let index = self.get_index(row, column);
            self.cells.set(index, true);
        }
    }
}

impl Universe {
    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in [(self.height - 1), 0, 1].iter().cloned() {
            for delta_col in [self.width - 1, 0, 1].iter().cloned() {
                if delta_row == 0 && delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + delta_row) % self.height;
                let neighbor_col = (column + delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }
        count
    }

    fn make_dead_cells(size: usize) -> FixedBitSet {
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, false);
        }

        cells
    }

    fn make_random_cells(width: u32, height: u32) -> FixedBitSet {
        let size = (width * height) as usize;
        let mut cells = FixedBitSet::with_capacity(size);

        for i in 0..size {
            cells.set(i, JSMath::random() < 0.5);
        }

        cells
    }
}
