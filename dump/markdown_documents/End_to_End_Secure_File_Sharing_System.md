---
title: "End to End Secure File Sharing System"
date: Sat Jul 22 2023 22:04:05
type: web
---
## InitUser

-   Secure the userdata\
    Enc keys are deterministic(Argon2, username and password), Sign with
    private key and store public sign key in keystore
-   Store it in datastore\
    UUID is deterministc (Argon2, username and password)\\

## GetUser

-   Derive UUID, Enc keys, check signature then decrypt\\
-   Check if input password matches\
    Since encryption protects the confidentiality, the attacker doesn\'t
    know the privatesignkey. If datastore is changed, the attacker
    won\'t be able to generate a valid signature

## StoreFile

### How if file stored?

File Struct contains a startNode and pointers to the endNode. File data
is stored in a linked list of many UUIDs, each encrypted and MAC with
different keys. Anyone knowing the file struct will be able to see the
file data. Filename is stored in owner\'s user struct only.

### If user have this file,

-   Go to the file UUID
-   Generate random encryption and mac keys and UUID and create a new
    Node with data in it
-   Change the corresponding values in the file UUID, and encrypt file
    UUID value

### If user don\'t have this file

-   Generate random UUID, encryption and mac keys, add in OwnerFile list
-   Go to the the file UUID
-   Generate new random encryption and mac keys and UUID and create a
    new Node with data in it
-   Change the corresponding values in the file UUID, and encrypt file
    UUID value Basically we don\'t change the keys or file UUID if user
    already has the file in store file

## LoadFile

Go to file UUID, then traverse the Node linked list, decrypt the file
data on each node and return the whole file

## AppendFile

-   Go to file UUID
-   Generate new random encryption and mac keys and UUID and create a
    new Node with data in it
-   Change the corresponding values in the file UUID and the pointer in
    endnode, and encrypt file UUID value
-   Append empty file

## CreateInvitation

### Owner

-   Generate a new UUID, in user struct add a shareduser(with the new
    UUID, username) to the ownerfile struct
-   Enc and mac the invitation, send the enc and mac to the uuid
-   Send the invitation uuid and enc and mac keys and sign to the other
    user
-   Enc (with shareduser\'s publickey) then sign(with user\'s
    privatekey) the invitation(file UUID, EncKey, DecKey), store in the
    new UUID

### Not Owner

-   Generate a new UUID
-   Enc and sign the invitation(derived from old invitation), store in
    new UUID

## AcceptInvitation

Add the new filename and UUID to the end of the sharedfile list

## RevocateInvitation

### RevocateAll

-   Go to file UUID and delete everything
-   Merge all the appends(make the Node list length=1) in a new
    UUID(change file location)
-   Change the ownerfile struct to corresponding values At this point no
    other shared users could access the file except for the owner

### Let others still have access

-   Delete the revocated user
-   Change the invitation UUID value to point to new file (enc then sign
    the invitation)

```{=html}
<!-- -->
```
    type User struct {
        Username       string
        PassHash       []byte
        PrivateSignKey userlib.DSSignKey
        PrivateDecKey  userlib.PKEDecKey
        MyFile         map[string]OwnerFile
    }
    type StoreKeys struct {
        Withoutkeymessage []byte
        Key               []byte
    }
    type OwnerFile struct {
        IsitMine bool
        //If owner
        UUID           uuid.UUID
        EncKey         []byte
        MacKey         []byte
        InvitationList map[string]InvitationPointer
        //If shared
        WhoShared         string
        InvitationPointer uuid.UUID
    }
    type File struct {
        NextEncKey []byte
        NextMacKey []byte
        NextUUID   uuid.UUID
        EndEncKey  []byte
        EndMacKey  []byte
        EndUUID    uuid.UUID
    }

    type Node struct {
        Filedata   []byte
        NextEncKey []byte
        NextMacKey []byte
        NextUUID   uuid.UUID
    }
    type InvitationPointer struct {
        InvitationEncKey []byte
        InvitationMacKey []byte
        InvitationUUID   uuid.UUID
    }
    type Invitation struct {
        FileEncKey []byte
        FileMacKey []byte
        FileUUID   uuid.UUID
    }

## Code Problems

\[0.08 Penalty\] The client should not leak the length of filenames.
\[0.08 Penalty\] Append should NOT scale with the number of files a user
has. \[0.08 Penalty\] Append should NOT scale with the length of a
user\'s username. \[0.01 Penalty\] Call AcceptInvitation using a used
filename (used by a file we created). \[0.01 Penalty\] Call
AcceptInvitation using a used filename (used by a file we previously
recieved). \[0.01 Penalty\] Call AcceptInvitation after swapping
invitation with another for a different file.

## Potential Solutions

-   Store the filename hash and the username hash in the database
    instead of the original filename and username, which reduces the
    bandwidth.
-   Don\'t store the invitational pointer inside the user struct in
    Datastore, instead store it in deterministic position (by username
    and filenamehash) and encrypt using the publickey
    User-\>FileInfo-\>InvitationPointer-\>Invitation-\>File Struct
    User-\>FileInfo-\>InvitationUUIDList

## Conclusion

I got a good score but there was mistakes nevertheless. I was frustrated
and didn\'t want to write my code again after discovering the bugs
because I feared that there might be more bugs.

## References

- [Argon2 Documentation](https://github.com/P-H-C/phc-winner-argon2)
- [UUID Specification](https://datatracker.ietf.org/doc/html/rfc4122)
- [Golang Documentation](https://golang.org/doc/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [CS161](https://cs161.org/)


