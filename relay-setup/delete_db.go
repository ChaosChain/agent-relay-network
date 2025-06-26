package main

import (
	"fmt"
	"os"
)

func deleteDatabases() {
	dbFiles := []string{
		"/tmp/khatru-sqlite-tmp1",
		"/tmp/khatru-sqlite-tmp2",
		"/tmp/khatru-sqlite-tmp3",
	}

	for _, file := range dbFiles {
		err := os.Remove(file)
		if err != nil {
			fmt.Printf("Failed to delete %s: %v\n", file, err)
		} else {
			fmt.Printf("Successfully deleted %s\n", file)
		}
	}
}

func main() {
	deleteDatabases()
}
