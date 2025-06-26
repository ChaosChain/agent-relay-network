package main

import (
	"fmt"
	"net/http"

	"github.com/fiatjaf/eventstore/sqlite3"
	"github.com/fiatjaf/khatru"
)

func main() {
	relay1 := khatru.NewRelay()
	relay2 := khatru.NewRelay()
	relay3 := khatru.NewRelay()

	db1 := sqlite3.SQLite3Backend{DatabaseURL: "/tmp/khatru-sqlite-tmp1"}
	if err := db1.Init(); err != nil {
		panic(err)
	}

	db2 := sqlite3.SQLite3Backend{DatabaseURL: "/tmp/khatru-sqlite-tmp2"}
	if err := db2.Init(); err != nil {
		panic(err)
	}

	db3 := sqlite3.SQLite3Backend{DatabaseURL: "/tmp/khatru-sqlite-tmp3"}
	if err := db3.Init(); err != nil {
		panic(err)
	}

	relay1.StoreEvent = append(relay1.StoreEvent, db1.SaveEvent)
	relay1.QueryEvents = append(relay1.QueryEvents, db1.QueryEvents)
	relay1.CountEvents = append(relay1.CountEvents, db1.CountEvents)
	relay1.DeleteEvent = append(relay1.DeleteEvent, db1.DeleteEvent)
	relay1.ReplaceEvent = append(relay1.ReplaceEvent, db1.ReplaceEvent)

	relay2.StoreEvent = append(relay2.StoreEvent, db2.SaveEvent)
	relay2.QueryEvents = append(relay2.QueryEvents, db2.QueryEvents)
	relay2.CountEvents = append(relay2.CountEvents, db2.CountEvents)
	relay2.DeleteEvent = append(relay2.DeleteEvent, db2.DeleteEvent)
	relay2.ReplaceEvent = append(relay2.ReplaceEvent, db2.ReplaceEvent)

	relay3.StoreEvent = append(relay3.StoreEvent, db3.SaveEvent)
	relay3.QueryEvents = append(relay3.QueryEvents, db3.QueryEvents)
	relay3.CountEvents = append(relay3.CountEvents, db3.CountEvents)
	relay3.DeleteEvent = append(relay3.DeleteEvent, db3.DeleteEvent)
	relay3.ReplaceEvent = append(relay3.ReplaceEvent, db3.ReplaceEvent)

	go func() {
		fmt.Println("running on :3331")
		http.ListenAndServe(":3331", relay1)
	}()
	go func() {
		fmt.Println("running on :3332")
		http.ListenAndServe(":3332", relay2)
	}()
	go func() {
		fmt.Println("running on :3333")
		http.ListenAndServe(":3333", relay3)
	}()

	// Block forever
	select {}
}
