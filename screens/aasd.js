<View style={styles.container}>
<View style={styles.listContainer}>
  <Text style={{ color: "white" }}>Players for {category}</Text>
  <FlatList
    data={players}
    renderItem={
      ({ item }) =>
        <View style={styles.playerContainer}>
          <View style={styles.player}>
            <Text style={styles.playerText}>{item.name}</Text>
          </View>
          {/* This button needs an onclick which removes the player from the list of players */}
          <TouchableOpacity onPress={() => removeFromPlayList(item.id)}>
            <Image source={TrashIcon} style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
    }
    keyExtractor={(item, index) => index.toString()}
  />
</View>


{/* We need to remove the player from saved players when that player exists in the player list */}
<View style={styles.listContainer}>
  <Text style={{ color: "white" }}>Saved Players</Text>
  <FlatList
    data={savedPlayers}
    renderItem={
      ({ item }) =>
        <TouchableOpacity onPress={() => addToPlayList(item)}>
          <View style={styles.playerContainer}>
            <View style={styles.player}>

              <Text style={styles.playerText}>{item.name}</Text>

            </View>

            <TouchableOpacity onPress={() => removePlayer(item)}>
              <Image source={TrashIcon} style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
    }
    keyExtractor={(item, index) => index.toString()} />
</View>

<View style={styles.addAnotherPlayer}>

  {isVisible && (
    <TextInput
      placeholder="Enter a name"
      value={name}
      style={styles.playerContainer}
      placeholderTextColor="white"
      ref={textInputRef}
      onChangeText={(text) => setName(text)}
      onSubmitEditing={addNewPlayer} />
  )}

  {!isVisible && (
    <TouchableOpacity style={styles.primaryButton} onPress={handleButtonPress}>
      <Text style={styles.primaryButtonText}>Save a new player</Text>
    </TouchableOpacity>
  )}
</View>


</View>